# SlipVertify
พื้นฐาน api จาก hmpr https://slipverify.hmpr.xyz/ 
# Usage 
```ts
import getSlipData from "."
import path from 'path';

getSlipData("HMPR-****************", path.join(__dirname, "fileName.jpg")).then(data => {
    console.log(data)
})
```
