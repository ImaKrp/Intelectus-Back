"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordRecovery = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class RequestPasswordRecovery {
    async execute(email) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw {
                error: { field: "email", message: "Conta não encontrada." },
                code: 400,
            };
        }
        const recovery = await prisma_1.default.passwordRecovery.create({
            data: {
                email,
            },
        });
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: "imakrp",
                pass: "gopejvewdlfniaeh",
            },
        });
        await transporter.sendMail({
            from: '"ImaKrp" <imakrp@gmail.com>',
            to: user.email,
            subject: "Recuperação de conta",
            text: `http://localhost:3000/recover/${recovery.id}`,
        });
        return {
            message: "Verifique seu E-mail",
        };
    }
}
exports.RequestPasswordRecovery = RequestPasswordRecovery;
