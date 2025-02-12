"use client";
import React from "react";

interface OrderbookHeaderProps {
  selectedSymbol: string;
  onOpenPairSelect: () => void;
}

const OrderbookHeader: React.FC<OrderbookHeaderProps> = ({
  selectedSymbol,
  onOpenPairSelect,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onOpenPairSelect}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span className="font-medium">{selectedSymbol}</span>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderbookHeader;
