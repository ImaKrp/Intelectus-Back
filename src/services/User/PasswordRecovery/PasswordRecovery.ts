import prismaClient from "../../../prisma";
import bcrypt from "bcrypt";

class PasswordRecovery {
  async execute(id: string, password: string) {
    const recovery = await prismaClient.passwordRecovery.findUnique({
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

    const hashedPassword = await bcrypt.hash(password, 10);

    await prismaClient.user.update({
      where: {
        email: recovery.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prismaClient.passwordRecovery.delete({
      where: {
        id: recovery.id,
      },
    });

    return {
      message: "Senha atualizada com sucesso",
    };
  }
}

export { PasswordRecovery };
