import { Product } from "@/components/features/orderbook/interface";
import { create } from "apisauce";

const api = create({
  baseURL: "https://api.bsx.exchange",
});

export const getProducts = async (): Promise<{ products: Product[] }> => {
  try {
    const response = await api.get<{ products: Product[] }>("/products");

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.problem}`);
    }

    if (!response.data) {
      throw new Error("No data received from products endpoint");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching products");
  }
};
