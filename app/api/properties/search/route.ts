import connectDB from "@/config/database";
import Property from "@/models/Property";

import { NextResponse, type NextRequest } from "next/server";

type Query = {
  $or: {
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    "location.street"?: { $regex: string; $options: string };
    "location.city"?: { $regex: string; $options: string };
    "location.state"?: { $regex: string; $options: string };
    "location.zip"?: { $regex: string; $options: string };
  }[];
  type?: RegExp;
};

// GET /api/properties/search
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location: string = searchParams.get("location") || "";
    const propertyType: string = searchParams.get("propertyType") || "";

    // Create a query object to search for properties
    let query: Query = {
      $or: [
        { name: { $regex: location, $options: "i" } },
        { description: { $regex: location, $options: "i" } },
        { "location.street": { $regex: location, $options: "i" } },
        { "location.city": { $regex: location, $options: "i" } },
        { "location.state": { $regex: location, $options: "i" } },
        { "location.zip": { $regex: location, $options: "i" } },
      ],
    };

    // Only check for property if its not 'All'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    // console.log("Properties Found:", properties.length);

    return NextResponse.json(properties);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
