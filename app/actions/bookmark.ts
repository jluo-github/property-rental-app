"use server";

import connectDB from "@/config/database";
import { getAuthUser, getError } from "./addProperty";
import { revalidatePath } from "next/cache";
import User, { type IUser } from "@/models/User";

export const bookmark = async (propertyId: string) => {
  try {
    await connectDB();

    // get session user
    const sessionUser = await getAuthUser();
    const userId = sessionUser?.id;
    if (!userId) {
      return { message: "User not authenticated", isBookmarked: false };
    }

    // get user by id
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.bookmarks) {
      user.bookmarks = [] as unknown as string[];
    }

    let isBookmarked: boolean = user.bookmarks.includes(propertyId);

    let message: string;

    // If already bookmarked, remove it
    if (isBookmarked) {
      // @ts-ignore
      user.bookmarks.pull(propertyId);

      message = "Property removed from bookmarks";
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Property added to bookmarks";
      isBookmarked = true;
    }

    // update user bookmarks
    await user.save();
    revalidatePath(`/properties/saved`);
    // return message
    return { message, isBookmarked };
  } catch (error) {
    return getError(error);
  }
};
