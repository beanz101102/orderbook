import { formatNumber } from "@/lib/utils/formatNumber";
import OrderList from "./OrderList";
import { usePairStore } from "@/lib/stores/usePairStore";

interface OrderbookContentProps {
  transformedAsks: Array<{ price: number; size: number; total: number }>;
  transformedBids: Array<{ price: number; size: number; total: number }>;
  maxAskTotal: number;
  maxBidTotal: number;
  decimals: number;
}

export const OrderbookContent: React.FC<OrderbookContentProps> = ({
  transformedAsks,
  transformedBids,
  maxAskTotal,
  maxBidTotal,
  decimals,
}) => {
  const { baseQuoteAsset } = usePairStore();

  return (
    <div className="flex-1 min-h-0 ">
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
    </div>
  );
};
