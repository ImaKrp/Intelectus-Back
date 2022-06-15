"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const AuthenticateUserService_1 = require("../services/User/AuthenticateUserService");
const CreateUserService_1 = require("../services/User/CreateUserService");
const UpdateUserService_1 = require("../services/User/UpdateUserService");
const RequestPasswordRecovery_1 = require("../services/User/PasswordRecovery/RequestPasswordRecovery");
const PasswordRecovery_1 = require("../services/User/PasswordRecovery/PasswordRecovery");
class UserController {
    async authenticate(req, res) {
        var _a, _b;
        const { email, password } = req.body;
        const errors = [];
        !email && errors.push("email");
        !password && errors.push("password");
        if (errors.length !== 0) {
            return res.status(400).json({
                error: {
                    message: errors.length === 1
                        ? `Field is required: ${errors[0]}`
                        : `Fields are required: ${errors.join(", ")}`,
                },
            });
        }
        const service = new AuthenticateUserService_1.AuthenticateUserService();
        try {
            const result = await service.execute(email, password);
            return res.json(result);
        }
        catch (err) {
            return res
                .status((_a = err.code) !== null && _a !== void 0 ? _a : 400)
                .json({ error: (_b = err.error) !== null && _b !== void 0 ? _b : err.message });
        }
    }
    async create(req, res) {
        var _a, _b;
        const { email, password, name } = req.body;
        const errors = [];
        !email && errors.push("email");
        !password && errors.push("password");
        !name && errors.push("name");
        if (errors.length !== 0) {
            return res.status(400).json({
                error: {
                    message: errors.length === 1
                        ? `Field is required: ${errors[0]}`
                        : `Fields are required: ${errors.join(", ")}`,
                },
            });
        }
        const service = new CreateUserService_1.CreateUserService();
        try {
            const result = await service.execute(email, password, name);
            return res.json(result);
        }
        catch (err) {
            return res
                .status((_a = err.code) !== null && _a !== void 0 ? _a : 400)
                .json({ error: (_b = err.error) !== null && _b !== void 0 ? _b : err.message });
        }
    }
    async update(req, res) {
        var _a, _b;
        const { user_id } = req;
        const { email, password, name, adress, phone, last_name } = req.body;
        if (!email && !password && !name && !last_name && !adress && !phone) {
            return res.status(400).json({
                error: {
                    message: `Some field is required: email, password, name`,
                },
            });
        }
        const service = new UpdateUserService_1.UpdateUserService();
        try {
            const result = await service.execute(Number(user_id), email, password, name);
            return res.json(result);
        }
        catch (err) {
            return res
                .status((_a = err.code) !== null && _a !== void 0 ? _a : 400)
                .json({ error: (_b = err.error) !== null && _b !== void 0 ? _b : err.message });
        }
    }
    async reqPasswordRecovery(req, res) {
        var _a, _b;
        const { email } = req.body;
        const service = new RequestPasswordRecovery_1.RequestPasswordRecovery();
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
        }
        catch (err) {
            return res
                .status((_a = err.code) !== null && _a !== void 0 ? _a : 400)
                .json({ error: (_b = err.error) !== null && _b !== void 0 ? _b : err.message });
        }
    }
    async passwordRecovery(req, res) {
        var _a, _b;
        const { id } = req.params;
        const { password } = req.body;
        const service = new PasswordRecovery_1.PasswordRecovery();
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
        }
        catch (err) {
            return res
                .status((_a = err.code) !== null && _a !== void 0 ? _a : 400)
                .json({ error: (_b = err.error) !== null && _b !== void 0 ? _b : err.message });
        }
    }
}
exports.UserController = UserController;
