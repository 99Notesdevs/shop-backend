export interface IProductRating {
    id?: number;
    productId: number;
    userId: number;
    rating: number;
    review?: string;
    createdAt?: Date;
    updatedAt?: Date;
}