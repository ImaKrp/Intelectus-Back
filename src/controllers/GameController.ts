import { Request, Response } from "express";
import { CreateHistoricalRecord } from "../services/Game/CreateHistoricalRecord";
import { ListAllHistoricalRecord } from "../services/Game/ListAllHistoricalRecord";

class GameController {
  async create(req: Request, res: Response) {
    const { game, type, time, error } = req.body;
    const { user_id } = req;

    const errors: String[] = [];
    !game && errors.push("game");
    !type && errors.push("type");
    !time && errors.push("time");
    !error && error !== 0 && errors.push("error");

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

    const service = new CreateHistoricalRecord();
    try {
      const result = await service.execute(
        game,
        type,
        time,
        error,
        Number(user_id)
      );
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }

  async list(req: Request, res: Response) {
    const { user_id } = req;
    const service = new ListAllHistoricalRecord();

    try {
      const result = await service.execute(Number(user_id));
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
}

export { GameController };
