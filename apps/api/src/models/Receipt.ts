import mongoose, { Schema } from 'mongoose';
const receiptSchema = new Schema({ business: { type: Schema.Types.ObjectId, ref: 'Business', required: true, index: true }, invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' }, receiptNumber: { type: String, required: true }, amount: Number, paidBy: String, qrCodeUrl: String, pdfUrl: String, issuedAt: { type: Date, default: Date.now } }, { timestamps: true });
export const Receipt = mongoose.model('Receipt', receiptSchema);
