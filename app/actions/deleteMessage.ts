"use server";

import connectDB from "@/config/database";
import { getAuthUser, getError } from "./addProperty";
import { revalidatePath } from "next/cache";
import Message from "@/models/Message";

export const deleteMessage = async (messageId: string) => {
  try {
    await connectDB();
    // get session user
    const sessionUser = await getAuthUser();
    const userId = sessionUser?.id;
    if (!userId) {
      return;
    }

    const message = await Message.findById(messageId);
    if (!message) {
      throw new Error("Message not found");
    }

    // check if recipient is owner
    if (message.recipient.toString() !== userId) {
      throw new Error("Unauthorized");
    }
    // delete message
    await message.deleteOne();
    revalidatePath("/messages");
    
  } catch (error) {
    return getError(error);
  }
};
