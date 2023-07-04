import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const route = Router();
const prisma = new PrismaClient();
route.get("/", async (req, res) => {
  try {
    const companies = await prisma.company.findMany();

    res.status(200).json({ companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", trace: error });
  } finally {
    prisma.$disconnect();
  }
});
route.post("/add", async (req, res) => {
  const payload: { name: string; desc?: string } = req.body;
  try {
    await prisma.company.create({
      data: {
        company_name: payload.name,
        description: payload.desc,
      },
    });
    res.status(200).json({ message: "company added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "failed to add company", trace: error });
  } finally {
    prisma.$disconnect();
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const company = await prisma.company.findFirstOrThrow({
      where: {
        id: Number(id),
      },
    });
    console.log("error logged", company);

    res.status(200).json({ ...company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", trace: error });
  } finally {
    prisma.$disconnect();
  }
});
export default route;
