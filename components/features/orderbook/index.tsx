"use client";
import React, { useState } from "react";
import OrderList from "./OrderList";
import OrderbookHeader from "./OrderbookHeader";
import PairSelectModal from "./PairSelectModal";
import { TabType } from "./interface";
import { useWebSocket } from "../../../lib/hooks/useWebSocket";
import { formatNumber } from "@/lib/utils/formatNumber";

const Orderbook: React.FC = () => {
  const [decimals] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC-PERP");
  const [activeTab, setActiveTab] = useState<TabType>("combined");
  const [baseQuoteAsset, setBaseQuoteAsset] = useState<{
    baseAsset: string;
    quoteAsset: string;
  }>({
    baseAsset: "BTC",
    quoteAsset: "USDC",
  });

  const { bids, asks, isLoading } = useWebSocket(selectedSymbol);

  const handleSymbolChange = (
    newSymbol: string,
    baseAsset: string,
    quoteAsset: string
  ) => {
    setBaseQuoteAsset({
      baseAsset,
      quoteAsset,
    });
    setSelectedSymbol(newSymbol);
    setIsModalOpen(false);
  };

  const calculateTotals = (orders: [string, string][]) => {
    let total = 0;
    return orders.map(([price, size]) => ({
      price: parseFloat(price),
      size: parseFloat(size),
      total: (total += parseFloat(size)),
    }));
  };

  const transformedAsks = calculateTotals([...asks].reverse());
  const transformedBids = calculateTotals(bids);

  const maxAskTotal = transformedAsks[transformedAsks.length - 1]?.total || 0;
  const maxBidTotal = transformedBids[transformedBids.length - 1]?.total || 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white rounded-xl border border-gray-800 shadow-lg w-[480px] h-[800px] flex flex-col">
      {/* Header Section */}
      <div className="border-b border-gray-800">
        {/* Tabs Section */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="p-4">
            <OrderbookHeader
              selectedSymbol={selectedSymbol}
              onOpenPairSelect={() => setIsModalOpen(true)}
            />
          </div>
          <div className="flex gap-1">
            {(["combined", "asks", "bids"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-colors
                ${
                  activeTab === tab
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
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
        </div>
      </div>

      <div className="flex-1 min-h-0 p-4">
        {activeTab === "combined" && (
          <div className="h-full flex flex-col space-y-1">
            <div className="flex-1 min-h-0 bg-gray-800/30 rounded-lg p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <OrderList
                orders={transformedAsks}
                type="asks"
                maxTotal={maxAskTotal}
                decimals={decimals}
                limit={6}
              />
            </div>

            <div className="bg-gray-800/20 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-center">
                <div className="text-2xl font-semibold">
                  {formatNumber(
                    transformedAsks[transformedAsks.length - 1]?.price ||
                      transformedBids[0]?.price ||
                      0,
                    decimals
                  )}
                  <span className="text-sm text-gray-400 ml-2">
                    {baseQuoteAsset.quoteAsset}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 bg-gray-800/30 rounded-lg p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <OrderList
                orders={transformedBids}
                type="bids"
                maxTotal={maxBidTotal}
                decimals={decimals}
                limit={6}
              />
            </div>
          </div>
        )}

        {activeTab === "asks" && (
          <div className="h-full bg-gray-800/30 rounded-lg p-2">
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <OrderList
                orders={transformedAsks}
                type="asks"
                maxTotal={maxAskTotal}
                decimals={decimals}
              />
            </div>
          </div>
        )}

        {activeTab === "bids" && (
          <div className="h-full bg-gray-800/30 rounded-lg p-2">
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <OrderList
                orders={transformedBids}
                type="bids"
                maxTotal={maxBidTotal}
                decimals={decimals}
              />
            </div>
          </div>
        )}
      </div>

      <PairSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSymbolChange}
        selectedPair={selectedSymbol}
      />
    </div>
  );
};

export default Orderbook;
