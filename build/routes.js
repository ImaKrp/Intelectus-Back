"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//? Controllers
const UserController_1 = require("./controllers/UserController");
const GameController_1 = require("./controllers/GameController");
//? MiddleWares
const ensureAuthenticated_1 = require("./middleWare/ensureAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
//? User
router.post("/register", new UserController_1.UserController().create);
router.post("/recover", new UserController_1.UserController().reqPasswordRecovery);
router.patch("/recover/:id", new UserController_1.UserController().passwordRecovery);
router.post("/authenticate", new UserController_1.UserController().authenticate);
router.put("/user/update", ensureAuthenticated_1.ensureAuthenticated, new UserController_1.UserController().update);
router.post("/game/result", ensureAuthenticated_1.ensureAuthenticated, new GameController_1.GameController().create);
router.get("/game/results", ensureAuthenticated_1.ensureAuthenticated, new GameController_1.GameController().list);
