import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IUser {
  email: string;
  id: string;
  permission: string;
}

interface IPayload {
  sub: string;
  user: IUser;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      error: "token.invalid",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ error: err });
  }
}
