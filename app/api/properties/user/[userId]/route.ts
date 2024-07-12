import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse, type NextRequest } from "next/server";
import cloudinary from "@/config/cloudinary";

// GET /api/properties/user/:userId
export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    await connectDB();

    const userId = params.userId;
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
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
