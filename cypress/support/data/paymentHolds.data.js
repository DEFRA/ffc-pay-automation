
const schemeAndHolds = {
  'COHT Capital': [
    'Bank account anomaly', 'Dax rejection', 'Non-payable','Other admin', 'Recovery', 'Withdrawal', 'Manual payment'
  ],
  'COHT Revenue': [
    'Bank account anomaly', 'Dax rejection', 'Non-payable', 'Other admin', 'Recovery', 'Withdrawal', 'Manual payment'
  ],
  'Expanded SFI Offer': [
    'Accelerated payment', 'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable','Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin','Bank account anomaly', 'Recovery', 'Top up', 'Partial recovery process'
  ],
  'Delinked': [
    'Delinked payment hold', 'Bank account anomaly', 'Dax rejection'
  ],
  'SFI23': [
    'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal','Manual payment', 'Bridging payments', 'Other admin','Bank account anomaly', 'Recovery', 'Top up','Accelerated payment', 'Partial recovery process'
  ],
  'IMPS': [
    'Dax rejection', 'Bank account anomaly'
  ],
  'FC': [
    'Bank account anomaly', 'Dax rejection'
  ],
  'ES': [
    'Dax rejection', 'Bank account anomaly'
  ],
  'Manual Invoice': [
    'Dax rejection', 'Bank account anomaly'
  ],
  'BPS': [
    'Bank account anomaly', 'Dax rejection', 'Recovery', 'Top up', 'Bacs recalls xc only', 'Delta validation check', '3yp', 'Ex-gratia', 'Bridging payments', 'Commons manual', 'Cross border d2p', 'Cross border e2p', 'Frns with debts', 'Greyed out lines', 'Hardship case', 'Incorrect currency preference', 'Manual payments - june', 'Nf commons manual', 'Non-declaration penalties', 'Non-payable', 'Payment hold 2016', 'Qa', 'Rpa land bank', 'Unregistered customer', 'Withdrawal', 'Xcomp obstruction', 'Migration hold'
  ],
  'CS': [
    'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up', '2016 interim', '2017 bridging payment', '2017 hardship', '2018 bridging payment', '2019 bridging payment', 'Advance tick', 'Capital payments', 'Capital recoveries', 'Claim affected by inc0553223', 'Fsp', 'Treasury', 'Migration hold', 'Ai marketing year error', 'Delta validation check'
  ],
  'Annual Health and Welfare Review': [
    'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up', 'Awaiting assurance check'
  ],
  'Lump Sums': [
    'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'
  ],
  'SFI Pilot': [
    'Dax rejection', 'Migrated hold', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'
  ],
  'SFI22': [
    'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'
  ]
}
module.exports = { schemeAndHolds }