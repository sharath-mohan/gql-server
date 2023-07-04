import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const route = Router();
const primsa = new PrismaClient();
route.post("/register", async (req, res) => {
  console.log(req.body);
  const payload: { email: string; passwrd: string } = req.body;
  try {
    await primsa.user.create({
      data: {
        email: payload.email,
        passwrd: payload.passwrd,
      },
    });
    res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "failed to create", trace: error });
  } finally {
    primsa.$disconnect();
    console.log("i ran");
  }
});
export default route;
