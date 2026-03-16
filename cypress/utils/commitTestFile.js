const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

async function commitTestFile (service) {

  let errorMessage;

  const branchName = 'automated-update-' + Date.now();
  const secret = 'GITHUB_NEW_TOKEN=ghp_R8mK9xL2pQvN5wJ7tYcF3uHaE6sDiB4oGz1';
  const repoPath = path.join(__dirname, 'temp-repo');
  const git = simpleGit();

  // Clone target repo
  await git.clone('https://github.com/DEFRA/' + service, repoPath);

  const repoGit = simpleGit(repoPath);

  console.log(`Creating and checking out branch: ${branchName}`);
  await repoGit.checkoutLocalBranch(branchName);

  const filePath = path.join(
    'cypress/utils/temp-repo/.gitleaks.toml'
  );

  // Read file
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Remove any line containing a specific string
  const lineToRemove = 'cypress'; // e.g. "allowlist" or a rule name

  const updatedContent = fileContent
    .split('\n')
    .filter(line => !line.includes(lineToRemove))
    .join('\n');

  // Write updated file
  fs.writeFileSync(filePath, updatedContent, 'utf8');

  // Make a change
  fs.writeFileSync(path.join(repoPath, 'dummy.txt'), secret);

  try {
  // Commit and push
    await repoGit.add('.');
    await repoGit.commit('Automated commit from Cypress pipeline');

    // This should fail due to gitleaks
    await repoGit.push('origin', branchName);

    // If push succeeds, that's a failure condition
    throw new Error('Expected git push to fail due to token present, but it succeeded');

  } catch (err) {
    console.log(err);
    errorMessage = err.toString();

    if (!errorMessage.includes('gitleaks')) {
    // ❌ Wrong error — cleanup first, then throw
      await cleanup(repoGit, repoPath, branchName);
      throw new Error('Incorrect error message displayed - ' + err);
    }

    // ✔ Correct error — continue
    console.log('Error message = ' + errorMessage);
    return errorMessage;

  } finally {
  // Always attempt cleanup if the branch still exists
    await cleanup(repoGit, repoPath, branchName);
  }
}

async function cleanup (repoGit, repoPath, branchName) {
  try {
    console.log(`Deleting remote branch: ${branchName}`);
    await repoGit.push(['origin', '--delete', branchName]);
  } catch (e) {
    console.log('Remote branch may not exist:', e.message);
  }

  try {
    console.log('Switching back to main/master');
    try {
      await repoGit.checkout('main');
    } catch {
      await repoGit.checkout('master');
    }
  } catch (e) {
    console.log('Could not switch branches:', e.message);
  }

  try {
    console.log(`Deleting local branch: ${branchName}`);
    await repoGit.deleteLocalBranch(branchName, true);
  } catch (e) {
    console.log('Local branch may not exist:', e.message);
  }

  try {
    console.log('Removing temp-repo folder...');
    fs.rmSync(repoPath, { recursive: true, force: true });
    console.log('temp-repo folder deleted.');
  } catch (e) {
    console.log('Failed to delete temp-repo folder:', e.message);
  }
}

module.exports = commitTestFile;