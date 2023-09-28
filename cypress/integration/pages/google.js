class googlePage {
  googleURL () {
    return 'https://www.google.com';
  }

  searchBar () {
    return cy.get('input[name="q"]');
  }
}

export default new googlePage();