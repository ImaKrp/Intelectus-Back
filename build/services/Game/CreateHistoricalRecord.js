"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHistoricalRecord = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const gamesTypes = {
    memoria: {
        legumes: 6,
        animais: 8,
        frutas: 10,
    },
    reconhecimento: {
        cores: 4,
        formas: 6,
        frutas: 8,
        animais: 8,
    },
};
class CreateHistoricalRecord {
    async execute(game, type, time, errors, user_id) {
        const value = 15 * gamesTypes[game][type] - 5 * errors - time * 1.5;
        const data = await prisma_1.default.performance.create({
            data: {
                errors,
                time,
                type,
                game,
                user_id,
                value,
            },
        });
        return data;
    }
}
exports.CreateHistoricalRecord = CreateHistoricalRecord;
