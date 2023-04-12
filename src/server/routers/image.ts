import { z } from 'zod';
import { procedure, router } from '../trpc';
import { api as unsplashAPI } from '../unsplash';

const toArray = (result: any) => {
  return Array.isArray(result) ? result : [result];
};

export const imageRouter = router({
  all: procedure.query(async () => {
    try {
      const result = await unsplashAPI.photos.getRandom({ query: 'dog', orientation: 'landscape', count: 50 });
      console.log('info', result.errors);
      return result.errors ? [] : toArray(result.response);
    } catch (e) {
      console.log('error', e);
      return [];
    }
  }),
});
