import { auth } from "@/auth";
import connectDB from "@/config/database";
import User from "@/models/User";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

//

// POST /api/bookmarks/check
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();

    // get user id from session
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id: userId } = session.user;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return NextResponse.json({ isBookmarked }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
