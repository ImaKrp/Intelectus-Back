import prismaClient from "../../prisma";

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
  async execute(
    game: string,
    type: string,
    time: number,
    errors: number,
    user_id: number
  ) {
    const value = 15 * gamesTypes[game][type] - 5 * errors - time * 1.5;

    const data = await prismaClient.performance.create({
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

export { CreateHistoricalRecord };
