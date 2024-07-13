import { Schema, model, models } from "mongoose";
import type { IProperty } from "./Property";
import type { IUser } from "./User";

export interface IMessage {
  _id: string;
  sender: IUser;
  recipient: IUser;
  property: IProperty;
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
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
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
