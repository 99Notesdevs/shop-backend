import { IProduct } from "./product.interface"

export interface IWishList {
    id?: number
    userId: number
    createdAt?: Date
    updatedAt?: Date
    products: IProduct[]
}