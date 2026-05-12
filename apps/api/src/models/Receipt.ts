import mongoose, { Schema } from 'mongoose';
const receiptSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: 'Business', required: true, index: true },
  invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
  receiptNumber: { type: String, required: true, index: true },
  amount: { type: Number, required: true, min: 0 },
  paidBy: { type: String, required: true },
  paymentMethod: { type: String, enum: ['Cash','Bank Transfer','Card','Cheque','Mobile Money','Other'], default: 'Cash' },
  qrCodeUrl: String,
  pdfUrl: String,
  issuedAt: { type: Date, default: Date.now, index: true }
}, { timestamps: true });
receiptSchema.index({ business: 1, receiptNumber: 1 }, { unique: true });
export const Receipt = mongoose.model('Receipt', receiptSchema);
