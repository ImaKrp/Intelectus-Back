import { Router } from "express";

//? Controllers

import { UserController } from "./controllers/UserController";
import { GameController } from "./controllers/GameController";

//? MiddleWares

import { ensureAuthenticated } from "./middleWare/ensureAuthenticated";

const router = Router();

//? User

router.post("/register", new UserController().create);

router.post("/recover", new UserController().reqPasswordRecovery);

router.patch("/recover/:id", new UserController().passwordRecovery);

router.post("/authenticate", new UserController().authenticate);

router.put("/user/update", ensureAuthenticated, new UserController().update);

router.post("/game/result", ensureAuthenticated, new GameController().create);

router.get("/game/results", ensureAuthenticated, new GameController().list);

export { router };
