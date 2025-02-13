"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePairStore } from "@/lib/stores/usePairStore";
import React from "react";
import { useWebSocket } from "../../../lib/hooks/useWebSocket";
import OrderbookHeader from "./OrderbookHeader";
import OrderbookTabs from "./OrderbookTabs";
import Image from "next/image";
import { getProducts } from "@/lib/services/products";

interface OrderbookProps {
  initialProducts: Awaited<ReturnType<typeof getProducts>>["products"];
}

const Orderbook: React.FC<OrderbookProps> = ({ initialProducts }) => {
  const { selectedSymbol, baseQuoteAsset } = usePairStore();
  const { bids, asks } = useWebSocket(selectedSymbol);

  return (
    <div className="bg-gray-900/40 text-white rounded-xl border border-gray-800/60 shadow-lg w-[480px] h-fit flex flex-col">
      <div className="border-b border-gray-800/60">
        <div className="px-4 py-3 border-b border-gray-800/60">
          <OrderbookHeader
            selectedSymbol={selectedSymbol}
            products={initialProducts}
          />

          <Tabs defaultValue="combined" className="w-full">
            <TabsList className="bg-gray-800/40">
              <TabsTrigger value="combined">
                <Image
                  src="https://app.bsx.exchange/icons/order-book-default.svg"
                  alt="Combined"
                  width={16}
                  height={16}
                />
              </TabsTrigger>
              <TabsTrigger value="asks">
                <Image
                  src="https://app.bsx.exchange/icons/order-book-ask.svg"
                  alt="Asks"
                  width={16}
                  height={16}
                />
              </TabsTrigger>
              <TabsTrigger value="bids">
                <Image
                  src="https://app.bsx.exchange/icons/order-book-bid.svg"
                  alt="Bids"
                  width={16}
                  height={16}
                />
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-[1.5fr,1fr,1fr] py-2 text-xs font-medium">
              <div className="text-gray-400">
                Price{" "}
                <span className="text-white ml-1">
                  {baseQuoteAsset.quoteAsset}
                </span>
              </div>
              <div className="text-gray-400 text-right">
                Size{" "}
                <span className="text-white ml-1">
                  {baseQuoteAsset.baseAsset}
                </span>
              </div>
              <div className="text-gray-400 text-right">Total</div>
            </div>

            <OrderbookTabs bids={bids} asks={asks} />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
