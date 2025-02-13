"use client";
import React, { useState } from "react";
import { usePairStore } from "@/lib/stores/usePairStore";
import PairSelectModal from "./PairSelectModal";
import { getProducts } from "@/lib/services/products";
import { ChevronDownIcon } from "lucide-react";

interface OrderbookHeaderProps {
  selectedSymbol: string;
  products: Awaited<ReturnType<typeof getProducts>>["products"];
}

const OrderbookHeader: React.FC<OrderbookHeaderProps> = ({
  selectedSymbol,
  products,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedPair } = usePairStore();

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center mb-4 gap-2 px-3 py-1.5 text-lg font-semibold border border-gray-700 rounded hover:border-gray-500 hover:text-gray-300"
      >
        {selectedSymbol}
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <PairSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={setSelectedPair}
        selectedPair={selectedSymbol}
        products={products}
      />
    </div>
  );
};

export default OrderbookHeader;
