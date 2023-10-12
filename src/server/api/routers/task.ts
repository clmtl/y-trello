import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getTaskById: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input,  }) => {
    const task = await ctx.db.task.findUnique({
      where: { id: Number(input.id) },
    });

    return task;
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const task = await ctx.db.task.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return task;
  }),

  create: protectedProcedure
  .input(z.object({ title: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.create({
      data:{
        title : input.title
      },
    });

    return task
  }),

  // update: protectedProcedure
  // .input(z.object({ title: z.string() }))
  // .mutation(async ({ ctx, input }) => {
  //   const task = await ctx.db.task.create({
  //     data:{
  //       title : input.title
  //     },
  //   });

  //   return task
  // }),
});
