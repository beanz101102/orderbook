import { create } from "zustand";

interface PairState {
  selectedSymbol: string;
  baseQuoteAsset: {
    baseAsset: string;
    quoteAsset: string;
  };
  setSelectedPair: (
    symbol: string,
    baseAsset: string,
    quoteAsset: string
  ) => void;
}

export const usePairStore = create<PairState>((set) => ({
  selectedSymbol: "BTC-PERP",
  baseQuoteAsset: {
    baseAsset: "BTC",
    quoteAsset: "USDC",
  },
  setSelectedPair: (symbol, baseAsset, quoteAsset) =>
    set({
      selectedSymbol: symbol,
      baseQuoteAsset: { baseAsset, quoteAsset },
    }),
}));
