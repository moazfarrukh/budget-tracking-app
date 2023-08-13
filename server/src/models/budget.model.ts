import mongoose, { Schema } from "mongoose"

interface IBudget {
    _id: Schema.Types.ObjectId,
    transaction_name: string,
    transaction_date: Date,
    price: number
    user: Schema.Types.ObjectId

}

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


const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;