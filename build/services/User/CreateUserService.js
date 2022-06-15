"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUserService {
    async execute(email, password, name) {
        let user = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            },
        });
        if (user) {
            throw {
                error: { field: "email", message: "E-mail já cadastrado." },
                code: 400,
            };
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        if (!user) {
            const data = {
                email,
                password: hashedPassword,
                name,
            };
            user = await prisma_1.default.user.create({
                data,
            });
        }
        delete user.password;
        delete user.id;
        return user;
    }
}
exports.CreateUserService = CreateUserService;
