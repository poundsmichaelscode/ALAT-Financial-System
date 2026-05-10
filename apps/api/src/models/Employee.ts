import mongoose, { Schema } from 'mongoose';
const employeeSchema = new Schema({ business: { type: Schema.Types.ObjectId, ref: 'Business', required: true, index: true }, name: { type: String, required: true }, email: String, department: String, role: String, salary: { type: Number, default: 0 }, startDate: Date, status: { type: String, enum: ['active','inactive'], default: 'active' } }, { timestamps: true });
export const Employee = mongoose.model('Employee', employeeSchema);
