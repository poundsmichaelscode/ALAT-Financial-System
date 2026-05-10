import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
export type Role = 'super_admin'|'admin'|'manager'|'accountant'|'employee';
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['super_admin','admin','manager','accountant','employee'], default: 'admin' },
  businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
  activeBusiness: { type: Schema.Types.ObjectId, ref: 'Business' },
  isEmailVerified: { type: Boolean, default: false },
  twoFactorEnabled: { type: Boolean, default: false },
  avatarUrl: String,
  lastLoginAt: Date
}, { timestamps: true });
userSchema.pre('save', async function(next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); next(); });
userSchema.methods.comparePassword = function(candidate: string) { return bcrypt.compare(candidate, this.password); };
export const User = mongoose.model('User', userSchema);
