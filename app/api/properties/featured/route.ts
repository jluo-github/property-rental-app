import connectDB from "@/config/database";
import Property, { type IProperty } from "@/models/Property";
import { NextResponse, type NextRequest } from "next/server";

// GET /api/properties
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties: IProperty[] = await Property.find({
      is_featured: true,
    });

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
