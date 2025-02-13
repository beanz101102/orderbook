import Orderbook from "@/components/features/orderbook";
import { getProducts } from "@/lib/services/products";

export default async function Home() {
  const { products } = await getProducts();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <Orderbook initialProducts={products} />
    </div>
  );
}
