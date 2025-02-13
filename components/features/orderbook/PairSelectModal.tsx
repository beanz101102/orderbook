"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Product } from "./interface";

interface PairSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (symbol: string, baseAsset: string, quoteAsset: string) => void;
  selectedPair: string;
  products: Product[];
}

const PairSelectModal: React.FC<PairSelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedPair,
  products,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products?.filter((product) =>
    product.product_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Select Market</DialogTitle>
        </DialogHeader>

        <div className="p-2">
          <Input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          <div className="space-y-1">
            {filteredProducts?.map((product) => (
              <button
                key={product.product_id}
                onClick={() => {
                  onSelect(
                    product.product_id,
                    product.base_asset_symbol,
                    product.quote_asset_symbol
                  );
                  onClose();
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-800 flex items-center justify-between rounded-lg ${
                  selectedPair === product.product_id
                    ? "bg-gray-800"
                    : "bg-transparent"
                }`}
              >
                <div>
                  <span className="text-white font-medium">
                    {product.base_asset_symbol}
                  </span>
                  <span className="text-gray-400">
                    /{product.quote_asset_symbol}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {product.display_name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PairSelectModal;
