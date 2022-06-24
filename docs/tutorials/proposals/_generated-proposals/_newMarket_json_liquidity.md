```javascript
 {
  // Specified as a unitless number that represents the amount of settlement asset of the market (string) 
  commitmentAmount: "2500460",
  // Nominated liquidity fee factor, which is an input to the calculation of taker fees on the market, as per seeting fees and rewarding liquidity providers (undefined as string) 
  fee: 0.10,
  // A set of liquidity buy orders to meet the liquidity provision obligation
  buys: [
   {
    // The offset/amount of units away for the order (string) 
    offset: "84",
    // The relative proportion of the commitment to be allocated at a price level (int64 as integer) 
    proportion: 8,
    // The pegged reference point for the order (string) 
    reference: "PEGGED_REFERENCE_BEST_BID",
   },
   {
    offset: "43",
    proportion: 9,
    reference: "PEGGED_REFERENCE_BEST_BID",
   },
   {
    offset: "1",
    proportion: 3,
    reference: "PEGGED_REFERENCE_BEST_BID",
   }
  ],
  // A set of liquidity buy orders to meet the liquidity provision obligation
  sells: [
   {
    // The offset/amount of units away for the order (string) 
    offset: "20",
    // The relative proportion of the commitment to be allocated at a price level (int64 as integer) 
    proportion: 9,
    // The pegged reference point for the order (string) 
    reference: "PEGGED_REFERENCE_BEST_ASK",
   },
   {
    offset: "65",
    proportion: 3,
    reference: "PEGGED_REFERENCE_BEST_ASK",
   },
   {
    offset: "69",
    proportion: 8,
    reference: "PEGGED_REFERENCE_BEST_ASK",
   }
  ],
 }
}
```