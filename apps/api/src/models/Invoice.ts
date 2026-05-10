import mongoose, { Schema } from 'mongoose';
const itemSchema = new Schema({ description: String, quantity: Number, unitPrice: Number }, { _id: false });
const invoiceSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: 'Business', required: true, index: true },
  clientName: { type: String, required: true }, clientEmail: String, clientAddress: String,
  invoiceNumber: { type: String, required: true, index: true },
  items: [itemSchema], tax: { type: Number, default: 0 }, discount: { type: Number, default: 0 },
  total: { type: Number, required: true }, dueDate: Date, notes: String,
  status: { type: String, enum: ['paid','pending','overdue'], default: 'pending', index: true }, pdfUrl: String
}, { timestamps: true });
export const Invoice = mongoose.model('Invoice', invoiceSchema);
