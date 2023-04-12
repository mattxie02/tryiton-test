import { createApi } from "unsplash-js";

export const api = createApi({
  accessKey: process.env.UNSPLASH_API_KEY ?? '',
});
