
  ```bash
./vegawallet transaction send --wallet your_walletname --pubkey your_public_key --network mainnet1 '{
 "proposalSubmission": {
  "rationale": {
   "title": "An example freeform proposal",
   "description": "I propose that everyone evaluate the following IPFS document and vote Yes if they agree. [bafybeigwwctpv37xdcwacqxvekr6e4kaemqsrv34em6glkbiceo3fcy4si](https://dweb.link/ipfs/bafybeigwwctpv37xdcwacqxvekr6e4kaemqsrv34em6glkbiceo3fcy4si)"
  },
  "terms": {
   "newFreeform": {},
   "closingTimestamp": 1685262345000
  }
 }
}'
```
  