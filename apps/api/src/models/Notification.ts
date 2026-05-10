import mongoose, { Schema } from 'mongoose';
const notificationSchema = new Schema({ business: { type: Schema.Types.ObjectId, ref: 'Business', index: true }, user: { type: Schema.Types.ObjectId, ref: 'User', index: true }, title: String, message: String, type: { type: String, enum: ['invoice','payroll','budget','fraud','system'], default: 'system' }, read: { type: Boolean, default: false } }, { timestamps: true });
export const Notification = mongoose.model('Notification', notificationSchema);
