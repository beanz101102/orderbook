interface Order {
  price: number;
  size: number;
  total: number;
}

export interface OrderListProps {
  orders: Order[];
  type: "asks" | "bids";
  maxTotal: number;
  decimals: number;
  limit?: number;
}
