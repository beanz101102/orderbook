import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import OrderList from "./OrderList";
import { OrderbookContent } from "./OrderbookContent";

interface OrderbookTabsProps {
  bids: [string, string][];
  asks: [string, string][];
}

const OrderbookTabs: React.FC<OrderbookTabsProps> = ({ bids, asks }) => {
  const [decimals] = useState(1);

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

  return (
    <div className="flex flex-col h-[560px]">
      <TabsContent value="combined" className="flex-1 min-h-0">
        <div className="h-full overflow-hidden">
          <OrderbookContent
            transformedAsks={transformedAsks}
            transformedBids={transformedBids}
            maxAskTotal={maxAskTotal}
            maxBidTotal={maxBidTotal}
            decimals={decimals}
          />
        </div>
      </TabsContent>

      <TabsContent value="asks" className="flex-1 min-h-0">
        <div className="h-full bg-gray-800/30 rounded-lg overflow-auto custom-scrollbar">
          <OrderList
            orders={transformedAsks}
            type="asks"
            maxTotal={maxAskTotal}
            decimals={decimals}
            limit={25}
          />
        </div>
      </TabsContent>

      <TabsContent value="bids" className="flex-1 min-h-0">
        <div className="h-full bg-gray-800/30 rounded-lg overflow-auto custom-scrollbar">
          <OrderList
            orders={transformedBids}
            type="bids"
            maxTotal={maxBidTotal}
            decimals={decimals}
            limit={25}
          />
        </div>
      </TabsContent>
    </div>
  );
};

export default OrderbookTabs;
