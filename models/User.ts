import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  username: string;
  image?: string;
  bookmarks?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },

    image: {
      type: String,
    },

    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
