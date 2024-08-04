"use server";

import connectDB from "@/config/database";
import { getAuthUser } from "./addProperty";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

export const addMessage = async (prevState: any, formData: FormData) => {
  await connectDB();
  // get session user
  const sessionUser = await getAuthUser();
  const userId = sessionUser?.id;
  if (!userId) {
    return;
  }
  const recipient = formData.get("recipient");

  // check if user is sending message to self
  // if (userId === recipient) {
  //   throw new Error("You cannot send a message to yourself");
  // }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  // Save newMessage to database
  await newMessage.save();
  revalidatePath("/messages");
  return { submitted: true as boolean };
};
