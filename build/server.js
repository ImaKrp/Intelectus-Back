"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.serverHttp.listen(process.env.PORT || 80, () =>
  console.log(`🚀  Server is running on PORT ${process.env.PORT || 80}`)
);
