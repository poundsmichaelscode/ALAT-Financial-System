import mongoose, { Schema } from 'mongoose';
const auditLogSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: 'Business', index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  action: { type: String, required: true },
  entity: String,
  entityId: String,
  metadata: Schema.Types.Mixed,
  ipAddress: String
}, { timestamps: true });
export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
