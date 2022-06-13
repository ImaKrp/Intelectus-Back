import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/User/AuthenticateUserService";
import { CreateUserService } from "../services/User/CreateUserService";
import { UpdateUserService } from "../services/User/UpdateUserService";
import { RequestPasswordRecovery } from "../services/User/PasswordRecovery/RequestPasswordRecovery";
import { PasswordRecovery } from "../services/User/PasswordRecovery/PasswordRecovery";

class UserController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const errors: String[] = [];
    !email && errors.push("email");
    !password && errors.push("password");

    if (errors.length !== 0) {
      return res.status(400).json({
        error: {
          message:
            errors.length === 1
              ? `Field is required: ${errors[0]}`
              : `Fields are required: ${errors.join(", ")}`,
        },
      });
    }

    const service = new AuthenticateUserService();
    try {
      const result = await service.execute(email, password);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
  async create(req: Request, res: Response) {
    const { email, password, name } = req.body;

    const errors: String[] = [];
    !email && errors.push("email");
    !password && errors.push("password");
    !name && errors.push("name");

    if (errors.length !== 0) {
      return res.status(400).json({
        error: {
          message:
            errors.length === 1
              ? `Field is required: ${errors[0]}`
              : `Fields are required: ${errors.join(", ")}`,
        },
      });
    }

    const service = new CreateUserService();

    try {
      const result = await service.execute(
        email,
        password,
        name,
      );
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
  async update(req: Request, res: Response) {
    const { user_id } = req;
    const { email, password, name, adress, phone, last_name } = req.body;

    if (!email && !password && !name && !last_name && !adress && !phone) {
      return res.status(400).json({
        error: {
          message: `Some field is required: email, password, name`,
        },
      });
    }

    const service = new UpdateUserService();
    try {
      const result = await service.execute(
        Number(user_id),
        email,
        password,
        name,
      );
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }

  async reqPasswordRecovery(req: Request, res: Response) {
    const { email } = req.body;
    const service = new RequestPasswordRecovery();

    if (!email) {
      return res.status(400).json({
        error: {
          message: `Field is required: email`,
        },
      });
    }

    try {
      const result = await service.execute(email);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }

  async passwordRecovery(req: Request, res: Response) {
    const { id } = req.params;
    const { password } = req.body;
    const service = new PasswordRecovery();

    if (!password) {
      return res.status(400).json({
        error: {
          message: `Field is required: password`,
        },
      });
    }

    try {
      const result = await service.execute(id, password);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
}

export { UserController };
