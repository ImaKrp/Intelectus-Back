"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const CreateHistoricalRecord_1 = require("../services/Game/CreateHistoricalRecord");
const ListAllHistoricalRecord_1 = require("../services/Game/ListAllHistoricalRecord");
class GameController {
    async create(req, res) {
        var _a, _b;
        const { game, type, time, error } = req.body;
        const { user_id } = req;
        const errors = [];
        !game && errors.push("game");
        !type && errors.push("type");
        !time && errors.push("time");
        !error && error !== 0 && errors.push("error");
        if (errors.length !== 0) {
            return res.status(400).json({
                error: {
                    message: errors.length === 1
                        ? `Field is required: ${errors[0]}`
                        : `Fields are required: ${errors.join(", ")}`,
                },
            });
        }
        const service = new CreateHistoricalRecord_1.CreateHistoricalRecord();
        try {
            const result = await service.execute(game, type, time, error, Number(user_id));
            return res.json(result);
        }
        catch (err) {
            return res
                .status((_a = err.code) !== null && _a !== void 0 ? _a : 400)
                .json({ error: (_b = err.error) !== null && _b !== void 0 ? _b : err.message });
        }
    }
    async list(req, res) {
        var _a, _b;
        const { user_id } = req;
        const service = new ListAllHistoricalRecord_1.ListAllHistoricalRecord();
        try {
            const result = await service.execute(Number(user_id));
            return res.json(result);
        }
        catch (err) {
            return res
                .status((_a = err.code) !== null && _a !== void 0 ? _a : 400)
                .json({ error: (_b = err.error) !== null && _b !== void 0 ? _b : err.message });
        }
    }
}
exports.GameController = GameController;
