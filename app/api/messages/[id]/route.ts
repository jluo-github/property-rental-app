import { auth } from "@/auth";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;

    // get the user from the session
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 401 }
      );
    }
    const { id: userId } = session.user;

    // find the message by id
    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    // check if the message is for the user
    if (message.recipient.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    // update message as read
    message.read = !message.read;
    await message.save();

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};

// DELETE /api/messages/:id
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;

    // get the user from the session
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 401 }
      );
    }
    const { id: userId } = session.user;

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    // check if the message is for the user
    if (message.recipient.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    await message.deleteOne();

    return NextResponse.json({ message: "Message deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
