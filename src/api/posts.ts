import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "api/config";

export const api = createApi({
  baseQuery,
  reducerPath: "postsApi",
  tagTypes: [],
  endpoints: (build) => ({
    getPosts: build.query<any, any>({
        query: () => `posts`,
      }),
  }),
});

export const { useGetPostsQuery } = api;
