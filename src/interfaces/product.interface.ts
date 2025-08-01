export interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    categoryId: number;
    createdAt?: Date;
    updatedAt?: Date;
}