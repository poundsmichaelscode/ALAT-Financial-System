import mongoose, { Schema } from 'mongoose';
const businessSchema = new Schema({
  name: { type: String, required: true, trim: true },
  industry: String,
  currency: { type: String, default: 'NGN' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  members: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, role: String }],
  settings: { fiscalYearStart: String, taxRate: { type: Number, default: 0 }, invoicePrefix: { type: String, default: 'ALAT' } }
}, { timestamps: true });
export const Business = mongoose.model('Business', businessSchema);
