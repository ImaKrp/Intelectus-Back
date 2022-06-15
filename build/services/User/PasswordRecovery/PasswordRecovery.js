"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecovery = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordRecovery {
    async execute(id, password) {
        const recovery = await prisma_1.default.passwordRecovery.findUnique({
            where: {
                id,
            },
        });
        if (!recovery) {
            throw {
                error: { message: "Conta não encontrada." },
                code: 400,
            };
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await prisma_1.default.user.update({
            where: {
                email: recovery.email,
            },
            data: {
                password: hashedPassword,
            },
        });
        await prisma_1.default.passwordRecovery.delete({
            where: {
                id: recovery.id,
            },
        });
        return {
            message: "Senha atualizada com sucesso",
        };
    }
}
exports.PasswordRecovery = PasswordRecovery;
