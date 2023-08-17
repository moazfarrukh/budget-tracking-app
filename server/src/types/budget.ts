import { Schema } from "mongoose"
export interface IBudget {
    _id: Schema.Types.ObjectId,
    transaction_name: string,
    transaction_date: Date,
    price: number
    user: Schema.Types.ObjectId

}
export interface IBudgetDoc extends Document, IBudget { }
