import { z } from 'zod';
import { procedure, router } from '../trpc';
import { imageRouter } from './image';

export const appRouter = router({
  image: imageRouter,
});

export type AppRouter = typeof appRouter;
