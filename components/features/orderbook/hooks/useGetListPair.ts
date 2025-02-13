import useSWR from "swr";
import { Product } from "../interface";
import { getProducts } from "@/lib/services/products";

export const useGetListPair = () => {
  const { data, error, isLoading } = useSWR<{ products: Product[] }>(
    "products",
    () => getProducts()
  );

  return { data, error, isLoading };
};
