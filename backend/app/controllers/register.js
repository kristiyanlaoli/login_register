import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";
import { config } from "dotenv";
config();

export const register = async (req, res) => {
  const { password, email, name } = req.body;
  const bcryptRound = Number(process.env.BCRYPT_ROUND);
  const hashedPassword = bcrypt.hashSync(password, bcryptRound);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      name: name,
      role_id: 2,
    },
  });

  res.status(201).json({
    message: "User has been created",
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role_id,
    },
  });
};
