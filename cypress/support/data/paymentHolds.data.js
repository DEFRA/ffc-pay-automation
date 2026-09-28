const schemeAndHolds = {
  'CS-HT (Capital)': ['Bank account anomaly', 'Dax rejection', 'Non-payable','Other admin', 'Recovery', 'Withdrawal', 'Manual payment', 'Test type - for demonstration'],
  'CS-HT (Revenue)': ['Bank account anomaly', 'Dax rejection', 'Non-payable', 'Other admin', 'Recovery', 'Withdrawal', 'Manual payment'],
  'SFI-EO': ['Accelerated payment', 'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable','Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin','Bank account anomaly', 'Recovery', 'Top up', 'Partial recovery process'],
  'Delinked Payments': ['Delinked payment hold', 'Bank account anomaly', 'Dax rejection'],
  'SFI-23': ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal','Manual payment', 'Bridging payments', 'Other admin','Bank account anomaly', 'Recovery', 'Top up','Accelerated payment', 'Partial recovery process'],
  'IMPS': ['Dax rejection', 'Bank account anomaly'],
  'GLOS (FC)': ['Bank account anomaly', 'Dax rejection'],
  'Genesis (ES)': ['Dax rejection', 'Bank account anomaly'],
  'Manual Payments (Injection)': ['Dax rejection', 'Bank account anomaly'],
  'BPS': ['Bank account anomaly', 'Dax rejection', 'Recovery', 'Top up', 'Bacs recalls xc only', 'Delta validation check', '3yp', 'Ex-gratia', 'Bridging payments', 'Commons manual', 'Cross border d2p', 'Cross border e2p', 'Frns with debts', 'Greyed out lines', 'Hardship case', 'Incorrect currency preference', 'Manual payments - june', 'Nf commons manual', 'Non-declaration penalties', 'Non-payable', 'Payment hold 2016', 'Qa', 'Rpa land bank', 'Unregistered customer', 'Withdrawal', 'Xcomp obstruction', 'Migration hold'],
  'CS': ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up', '2016 interim', '2017 bridging payment', '2017 hardship', '2018 bridging payment', '2019 bridging payment', 'Advance tick', 'Capital payments', 'Capital recoveries', 'Claim affected by inc0553223', 'Fsp', 'Treasury', 'Migration hold', 'Ai marketing year error', 'Delta validation check'],
  'Vet Visits (AHWR)': ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up', 'Withdrawal'],
  'Lump Sums': ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'],
  'SFI-P': ['Dax rejection', 'Migrated hold', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'],
  'SFI-22': ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'],
  'WMP': ['Bank account anomaly', 'Dax rejection', 'Manual payment', 'Non-payable', 'Other admin', 'Recovery', 'Withdrawal'],
  'SFI-26': ['Accelerated payment', 'Bank account anomaly', 'Bridging payments', 'Dax rejection', 'Ex-gratia', 'Hardship case', 'Manual payment', 'Non-payable', 'Other admin', 'Partial recovery process', 'Recovery', 'Top up', 'Withdrawal'],
  'FPTT': ['Accelerated payment', 'Bank account anomaly', 'Bridging payments', 'Dax rejection', 'Ex-gratia', 'Hardship case', 'Manual payment', 'Non-payable', 'Other admin', 'Recovery', 'Top up', 'Withdrawal']
}
module.exports = { schemeAndHolds }