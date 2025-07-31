export interface IProductRating {
    id?: number;
    productId: number;
    userId: number;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
}