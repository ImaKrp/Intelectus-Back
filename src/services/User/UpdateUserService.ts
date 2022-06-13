import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

interface IData {
  email?: string;
  password?: string;
  name?: string;
}

class UpdateUserService {
  async execute(
    user_id: number,
    email?: string,
    password?: string,
    name?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    let data: IData = {};
    email && (data.email = email);
    password && (data.password = hashedPassword);
    name && (data.name = name);

    if (email) {
      const user = await prismaClient.user.findFirst({
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

    const user = await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        ...data,
      },
    });

    delete user.password;
    delete user.id;
    return user;
  }
}

export { UpdateUserService };
