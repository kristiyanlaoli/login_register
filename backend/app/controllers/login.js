import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email is registered
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Email is not registered" });
  }

  // Check diblok atau enggak
  if (user.is_blocked) {
    return res.status(401).json({ message: "User is blocked" });
  }

  //Check Password
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  //Generate Token using jwt:
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  await prisma.token.create({
    data: {
      token,
      user_id: user.id,
      expires_at: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 days
    },
  });

  res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
};
