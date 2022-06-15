"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UpdateUserService {
    async execute(user_id, email, password, name) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        let data = {};
        email && (data.email = email);
        password && (data.password = hashedPassword);
        name && (data.name = name);
        if (email) {
            const user = await prisma_1.default.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (user && user.id !== user_id) {
                throw {
                    error: { field: "email", message: "E-mail já cadastrado." },
                    code: 400,
                };
            }
        }
        const user = await prisma_1.default.user.update({
            where: {
                id: user_id,
            },
            data: Object.assign({}, data),
        });
        delete user.password;
        delete user.id;
        return user;
    }
}
exports.UpdateUserService = UpdateUserService;
