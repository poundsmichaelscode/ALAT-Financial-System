import mongoose, { Schema } from 'mongoose';
const transactionSchema = new Schema({ business: { type: Schema.Types.ObjectId, ref: 'Business', required: true, index: true }, type: { type: String, enum: ['income','expense'], required: true }, source: String, amount: { type: Number, required: true }, description: String, date: { type: Date, default: Date.now, index: true }, referenceId: String }, { timestamps: true });
export const Transaction = mongoose.model('Transaction', transactionSchema);
