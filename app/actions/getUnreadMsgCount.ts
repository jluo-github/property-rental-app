"use server";

import connectDB from "@/config/database";
import { getAuthUser } from "./addProperty";
import Message from "@/models/Message";

export const getUnreadMsgCount = async () => {
  await connectDB();
  // get session user
  const sessionUser = await getAuthUser();
  const userId = sessionUser?.id;
  if (!userId) {
    return;
  }

  // get unread messages count
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
};
