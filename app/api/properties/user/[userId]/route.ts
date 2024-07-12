import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";
import { auth } from "@/auth";

// GET /api/properties/user/:userId
export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    await connectDB();

    const userId = params.userId;
    // console.log("GET method userId: ", userId);
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const properties = await Property.find({ owner: userId });

    return NextResponse.json(properties, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
