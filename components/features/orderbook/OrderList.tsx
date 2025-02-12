"use client";
import React from "react";
import { motion } from "framer-motion";
import { OrderListProps } from "./interface/order-list";
import { formatNumber } from "@/lib/utils/formatNumber";

const OrderList: React.FC<OrderListProps> = ({
  orders,
  type,
  maxTotal,
  decimals,
  limit,
}) => {
  const textColor = type === "asks" ? "text-red-500" : "text-green-500";
  const bgColor = type === "asks" ? "bg-red-500/5" : "bg-green-500/5";
  const hoverBgColor =
    type === "asks" ? "hover:bg-red-500/10" : "hover:bg-green-500/10";

  const displayOrders = limit ? orders.slice(0, limit) : orders;

  const calculateDepthPercentage = (total: number) => {
    if (maxTotal === 0) return 0;
    return (total / maxTotal) * 100;
  };

  return (
    <div className="space-y-[1px]">
      {displayOrders.map((order) => (
        <div
          key={`${type}-${order.price}`}
          className={`grid grid-cols-[1.5fr,1fr,1fr] py-1.5 px-2 relative rounded ${hoverBgColor} transition-colors duration-200`}
        >
          <div className={`${textColor} z-10 font-medium`}>
            {formatNumber(order.price, decimals)}
          </div>
          <div className="text-right z-10 text-gray-300">
            {formatNumber(order.size, 3)}
          </div>
          <div className="text-right z-10 text-gray-400">
            {formatNumber(order.total, 3)}
          </div>
          <motion.div
            className={`absolute inset-0 ${bgColor}`}
            initial={false}
            animate={{
              width: `${calculateDepthPercentage(order.total)}%`,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            style={{
              originX: type === "asks" ? 1 : 0,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
