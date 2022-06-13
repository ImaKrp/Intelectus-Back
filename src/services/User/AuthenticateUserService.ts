import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthenticateUserService {
  async execute(email: string, password: string) {
    let user = await prismaClient.user.findFirst({
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

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw {
        error: { field: "password", message: "Senha incorreta." },
        code: 400,
      };
    }

    const id = String(user.id);

    const token = sign(
      {
        user: {
          email: user.email,
          id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: id,
      }
    );

    delete user.password;
    delete user.id;
    return { token, user };
  }
}

export { AuthenticateUserService };
