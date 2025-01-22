import mongoose, { Schema } from "mongoose";

export interface IVerification {
  user_id: Schema.Types.ObjectId;
  otp: string;
  created_at: Schema.Types.Date;
}

const emailVerification = new Schema<IVerification>({
  user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  otp: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    expires: new Date(Date.now() + 3600 * 60 * 60 * 1000),
  },
});

const Verification = mongoose.model("emailVerification", emailVerification);
export default Verification;
