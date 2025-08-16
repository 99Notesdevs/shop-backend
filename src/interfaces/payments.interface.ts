export interface IPayment {
    id?: number;
    orderId: number;
    paymentMethod?: string;
    amount: number;
    status: string;
    phonepe_transaction_id?: string;
    phonepe_signature?: string;
    redirectUrl?: string;
    paymentDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPayload {
    name: string;
    productId: number;
    mobileNumber: string;
    amount: number;
    orderId: number;
    couponcode?: string;
    validity?: number;
    quantity?: number;
    phonepe_transaction_id?: string;
    status?: string;
    redirectUrl?: string;
}