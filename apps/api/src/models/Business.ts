import mongoose, { Schema } from 'mongoose';
const clientSchema = new Schema({ name: String, email: String, phone: String, address: String }, { _id: true });
const projectSchema = new Schema({ name: String, clientName: String, budget: { type: Number, default: 0 }, status: { type: String, enum: ['planned','active','completed','paused'], default: 'active' }, description: String }, { _id: true });
const businessSchema = new Schema({
  name: { type: String, required: true, trim: true },
  industry: String,
  email: String,
  phone: String,
  address: String,
  currency: { type: String, default: 'NGN' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  members: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, role: String }],
  clients: [clientSchema],
  projects: [projectSchema],
  settings: { fiscalYearStart: String, taxRate: { type: Number, default: 0 }, invoicePrefix: { type: String, default: 'ALAT' } }
}, { timestamps: true });
export const Business = mongoose.model('Business', businessSchema);
