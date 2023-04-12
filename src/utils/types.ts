import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '@/server/routers/_app';

export type Photo = inferProcedureOutput<AppRouter['image']['all']>[number];
