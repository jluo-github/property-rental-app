import { auth } from "@/auth";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();

    // check session User:
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 401 }
      );
    }
    const { id: userId } = session.user;
    // console.log('id', userId);

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return Response.json(messages);
  } catch (error) {
    console.log(error);
    return NextResponse.json((error as Error).message, { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient } =
      await request.json();

    // check session User:
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User ID is required" },
        {
          status: 401,
        }
      );
    }
    const { id: userId } = session.user;

    // cannot send message to self
    // if (userId === recipient) {
    //   return NextResponse.json(
    //     { message: "Cannot send message to yourself." },
    //     { status: 400 }
    //   );
    // }

    const newMessage = new Message({
      name,
      sender: userId,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    // Save message to database
    await newMessage.save();
    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
