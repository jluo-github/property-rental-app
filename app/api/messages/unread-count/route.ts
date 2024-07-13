import { auth } from "@/auth";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count
export const GET = async (request: NextRequest) => {
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

    // count unread messages
    const unreadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    console.log("unreadMessageCount--", unreadMessageCount);

    return NextResponse.json({ count: unreadMessageCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
