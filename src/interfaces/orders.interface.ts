export enum OrderStatus {
  Pending = "Pending",
  Failed = "Failed",
  Completed = "Completed",
  Canceled = "Canceled",
}

export interface IOrder {
  id?: number;
  orderDate: Date;
  totalAmount: number;
  status: OrderStatus;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  billingAddressId: number;
  shippingAddressId: number;
}