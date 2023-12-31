import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { State, Priority } from "@prisma/client";

export const taskRouter = createTRPCRouter({
  getTaskById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
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
    .input(z.object({ title: z.string(), state: z.nativeEnum(State) }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.create({
        data: {
          title: input.title,
          state: input.state,
          description: "No description yet",
        },
      });

      return task;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        state: z.nativeEnum(State),
        priority: z.nativeEnum(Priority),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.update({
        where: {
          id: Number(input.id),
        },
        data: {
          title: input.title,
          description: input.description,
          state: input.state,
          priority: input.priority,
        },
      });

      return task;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.delete({ where: { id: input.id } });

      return task
    }),
});
