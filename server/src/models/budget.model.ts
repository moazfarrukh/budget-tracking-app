import mongoose, { Schema } from "mongoose"
import { IBudget, IBudgetDoc } from "../types/budget";
const budgetSchema = new Schema<IBudget>({
    _id: Schema.Types.ObjectId,
    transaction_name: {
        type: String,
        default: ""
    },
    transaction_date: {
        type: Date,
        default: new Date()
    },
    price: {
        type: Number,
        default: 0,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})


const Budget = mongoose.model<IBudgetDoc>("Budget", budgetSchema);
export default Budget;