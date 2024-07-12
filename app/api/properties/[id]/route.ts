import { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await connectDB();
    const property = await Property.findById(id);

    if (!property)
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
      
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
