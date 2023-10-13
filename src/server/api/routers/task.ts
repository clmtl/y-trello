import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { State, Priority } from "@prisma/client";

export const taskRouter = createTRPCRouter({
  getTaskById: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/task" } })
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const task = await ctx.db.task.findUnique({
        where: { id: Number(input.id) },
      });

      return task;
    }),

  getAll: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/task" } })
    .query(async ({ ctx }) => {
      const task = await ctx.db.task.findMany({
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });

      return task;
    }),

  create: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/task" } })
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.create({
        data: {
          title: input.title,
        },
      });

      return task;
    }),

  update: protectedProcedure
    .meta({ openapi: { method: "PATCH", path: "/task" } })
    .input(
      z.object({
        id: z.string(),
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
});
