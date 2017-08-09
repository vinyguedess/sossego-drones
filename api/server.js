"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./src/bootstrap");
bootstrap_1.bootstrap.listen(3001, () => console.log("Application running at port 3001"));
