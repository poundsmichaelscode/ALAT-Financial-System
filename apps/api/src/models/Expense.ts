import mongoose, { Schema } from 'mongoose';
const expenseSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: 'Business', required: true, index: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, default: 'Miscellaneous', trim: true, index: true },
  department: String,
  vendor: String,
  date: { type: Date, default: Date.now, index: true },
  description: String,
  receiptUrl: String,
  recurring: { enabled: { type: Boolean, default: false }, frequency: { type: String, enum: ['daily','weekly','monthly','yearly'] } },
  approvalStatus: { type: String, enum: ['pending','approved','rejected'], default: 'approved', index: true },
  riskScore: { type: Number, default: 0 },
  tags: [String]
}, { timestamps: true });
expenseSchema.index({ business: 1, date: -1 });
expenseSchema.index({ business: 1, category: 1 });
export const Expense = mongoose.model('Expense', expenseSchema);
