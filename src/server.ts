import { serverHttp } from "./app";

serverHttp.listen(8000, () =>
  console.log(`🚀  Server is running on PORT 8000`)
);