import useSWR from "swr";
import { Product } from "../interface";
import { fetchJson } from "@/lib/utils/fetchJson";

export const useGetListPair = () => {
  const { data, error, isLoading } = useSWR<{ products: Product[] }>(
    "https://api.bsx.exchange/products",
    fetchJson
  );

  return { data, error, isLoading };
};
