import prismaClient from "../../prisma";

class ListAllHistoricalRecord {
  async execute(user_id: number) {
    const data = await prismaClient.performance.findMany({
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

export { ListAllHistoricalRecord };
