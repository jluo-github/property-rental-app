"use server";

import connectDB from "@/config/database";
import { getAuthUser, getError } from "./addProperty";
import { revalidatePath } from "next/cache";
import User, { type IUser } from "@/models/User";

export const checkBookmark = async (propertyId: string) => {
  try {
    await connectDB();

    // get session user
    const sessionUser = await getAuthUser();
    const userId = sessionUser?.id;
    if (!userId) {
      return;
    }
    // get user by id
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.bookmarks) {
      user.bookmarks = [];
    }

    let isBookmarked: boolean = user.bookmarks.includes(propertyId);
    // console.log("isBookmarked: ", isBookmarked);

    revalidatePath(`/properties/${propertyId}`);
    return { isBookmarked };
  } catch (error) {
    return getError(error);
  }
};
