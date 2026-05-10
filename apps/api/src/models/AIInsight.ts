import mongoose, { Schema } from 'mongoose';
const aiInsightSchema = new Schema({ business: { type: Schema.Types.ObjectId, ref: 'Business', required: true, index: true }, prompt: String, summary: String, recommendations: [String], riskFlags: [String], forecast: Schema.Types.Mixed }, { timestamps: true });
export const AIInsight = mongoose.model('AIInsight', aiInsightSchema);
