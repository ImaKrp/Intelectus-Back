"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllHistoricalRecord = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListAllHistoricalRecord {
    async execute(user_id) {
        const data = await prisma_1.default.performance.findMany({
            where: {
                user_id,
            },
            orderBy: {
                date: "asc",
            },
        });
        return data;
    }
}
exports.ListAllHistoricalRecord = ListAllHistoricalRecord;
