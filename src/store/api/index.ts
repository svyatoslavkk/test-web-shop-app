import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string[] | undefined>({
      query: (dealers) => {
        if (dealers && dealers.length > 0) {
          return `goods/?dealers=${dealers.join(",")}`;
        }
        return "goods/";
      },
    }),
    getDealers: builder.query<string[], void>({
      query: () => "dealers/",
    }),
  }),
});

export const { useGetProductsQuery, useGetDealersQuery } = api;
