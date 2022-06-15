"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthenticateUserService {
    async execute(email, password) {
        let user = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw {
                error: { field: "email", message: "E-mail não cadastrado." },
                code: 400,
            };
        }
        const validatePassword = await bcrypt_1.default.compare(password, user.password);
        if (!validatePassword) {
            throw {
                error: { field: "password", message: "Senha incorreta." },
                code: 400,
            };
        }
        const id = String(user.id);
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                email: user.email,
                id,
            },
        }, process.env.JWT_SECRET, {
            subject: id,
        });
        delete user.password;
        delete user.id;
        return { token, user };
    }
}
exports.AuthenticateUserService = AuthenticateUserService;
