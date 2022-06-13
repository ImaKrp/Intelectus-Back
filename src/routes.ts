import { Router } from "express";

//? Controllers

import { UserController } from "./controllers/UserController";

//? MiddleWares

import { ensureAuthenticated } from "./middleWare/ensureAuthenticated";

const router = Router();

//? User

router.post("/register", new UserController().create);

router.post("/recover", new UserController().reqPasswordRecovery);

router.patch("/recover/:id", new UserController().passwordRecovery);

router.post("/authenticate", new UserController().authenticate);

router.put("/user/update", ensureAuthenticated, new UserController().update);

export { router };
