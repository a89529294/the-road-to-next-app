because of floating point errors we need to use big.js

- `npm i big.js`
- `npm i @types/big.js --save-dev`

```ts
import Big from "big.js";

new Big(amount).mul(100).round(2, Big.roundHalfEven).toNumber();
```
