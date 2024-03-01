import mongoose from 'mongoose'


const IPAddressSchema = new mongoose.Schema(
    {
      address: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const UserAgentSchema = new mongoose.Schema(
    {
      raw: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

export const SessionSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      device: {
        type: String,
        required: true,
      },
      agents: {
        type: [UserAgentSchema],
        required: true,
      },
      hosts: {
        type: [IPAddressSchema],
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        default: () => {
          const date = new Date();
          date.setDate(date.getDate() + 30);
          return date;
        },
      },
      revokedAt: Date,
      revokedReason: {
        type: String,
        required: true,
      },
    },
    { timestamps: true, collection: "auth_sessions" }
  );

export default mongoose.model('Session', SessionSchema)