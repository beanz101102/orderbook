import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OrderbookState {
  asks: [string, string][];
  bids: [string, string][];
  isLoading: boolean;
  setOrderBook: (bids: [string, string][], asks: [string, string][]) => void;
  updateOrderBook: (bids: [string, string][], asks: [string, string][]) => void;
  setLoading: (loading: boolean) => void;
}

const useOrderbookStore = create<OrderbookState>()(
  devtools((set, get) => ({
    asks: [],
    bids: [],
    isLoading: true,

    setOrderBook: (bids: [string, string][], asks: [string, string][]) => {
      set({
        bids,
        asks,
        isLoading: false,
      });
    },

    updateOrderBook: (bids: [string, string][], asks: [string, string][]) => {
      const state = get();
      const updatedAsks = [...state.asks];
      const updatedBids = [...state.bids];

      // Process asks updates
      if (asks && asks.length > 0) {
        asks.forEach(([price, size]) => {
          const index = updatedAsks.findIndex(([p]) => p === price);
          if (size === "0" && index !== -1) {
            updatedAsks.splice(index, 1);
          } else if (size !== "0") {
            if (index !== -1) {
              updatedAsks[index] = [price, size];
            } else {
              updatedAsks.push([price, size]);
            }
          }
        });
      }

      // Process bids updates
      if (bids && bids.length > 0) {
        bids.forEach(([price, size]) => {
          const index = updatedBids.findIndex(([p]) => p === price);
          if (size === "0" && index !== -1) {
            updatedBids.splice(index, 1);
          } else if (size !== "0") {
            if (index !== -1) {
              updatedBids[index] = [price, size];
            } else {
              updatedBids.push([price, size]);
            }
          }
        });
      }

      // Sort orders
      updatedAsks.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
      updatedBids.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));

      set({
        asks: updatedAsks,
        bids: updatedBids,
      });
    },

    setLoading: (loading: boolean) => set({ isLoading: loading }),
  }))
);

export default useOrderbookStore;
