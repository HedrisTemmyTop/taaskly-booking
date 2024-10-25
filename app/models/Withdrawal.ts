import mongoose, { Schema } from "mongoose";

interface IWithdrawal extends Document {
  amountDebited: number;
  userId: string;
  accountNumber: number;
  bankName: string;
  accountName: string;
  gatewayFee: number;
  amountReceived: number;
  usersBalanceAtThatTime: number;
  userEmail: string;
  status: "success" | "pending" | "failed";
}

const withdrawalSchema = new Schema<IWithdrawal>(
  {
    amountDebited: {
      type: Number,
      required: [true, "Amount to be withdrawn is required"],
    },
    userId: {
      type: String,
      required: [true, "User id isrequired"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
    bankName: {
      type: String,
      required: [true, "Bank name is required"],
    },
    accountNumber: {
      type: Number,
      required: [true, "Account number is required"],
    },
    accountName: {
      type: String,
      required: [true, "Account name is required"],
    },
    gatewayFee: {
      type: Number,
      required: [true, "Gateway fee  isrequired"],
    },
    amountReceived: {
      type: Number,
      required: [true, "Amount recieved is required"],
    },
    usersBalanceAtThatTime: {
      type: Number,
      required: [true, "User's balance at the time is required"],
    },

    status: {
      type: String,
      required: [true, "status   is required"],
    },
  },
  {
    timestamps: true,
  }
);

const WithdrawalModel =
  mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalSchema);

export default WithdrawalModel;
