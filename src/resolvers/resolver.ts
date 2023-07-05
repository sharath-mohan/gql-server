import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const resolvers = {
  Query: {
    jobs: async () => {
      const jobs = await prisma.job.findMany();
      return jobs;
    },
  },
  Job: {
    company: async (job) => {
      console.log(job);
      const company = await prisma.company.findFirst({
        where: {
          id: job.company_id,
        },
      });
      return company;
    },
  },
};
