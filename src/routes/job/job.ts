import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const route = Router();
const prisma = new PrismaClient();
route.get("/", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      },
    });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", trace: error });
  } finally {
    prisma.$disconnect();
  }
});
route.post("/add", async (req, res) => {
  const payload: { jobTitle: string; desc?: string; id: number } = req.body;
  try {
    await prisma.job.create({
      data: {
        job_title: payload.jobTitle,
        descripton: payload.desc,
        company_id: payload.id,
      },
    });
    res.status(200).json({ message: "job added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "failed to add job", trace: error });
  } finally {
    prisma.$disconnect();
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.job.findFirstOrThrow({
      include: {
        company: true,
      },
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ ...job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", trace: error });
  } finally {
    prisma.$disconnect();
  }
});

export default route;
