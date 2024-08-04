import { Schema, model, models, Document, Types } from "mongoose";

export interface IMessage extends Document {
  _id: string;
  sender: { _id: string; username: string };
  recipient: Types.ObjectId;
  property: { _id: string; name: string };
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model<IMessage>("Message", MessageSchema);

export default Message;
