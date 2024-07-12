import { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { auth } from "@/auth";

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

// DELETE /api/properties/:id
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    // get property id from params
    const propertyId = params.id;
    if (!propertyId) {
      return NextResponse.json(
        { message: "Property ID is required" },
        { status: 400 }
      );
    }

    // get user id from session
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id: userId } = session.user;

    // find property by id
    const property = await Property.findById(propertyId);

    // check if property exists
    if (!property) {
      return NextResponse.json(
        { message: "Property not found." },
        { status: 404 }
      );
    }
    // check if user is the owner of the property
    if (property.owner.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // delete property
    await property.deleteOne();

    return NextResponse.json(
      { message: "Property Deleted." },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};

// PUT /api/properties/:id
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    // get property id from params
    const { id } = params;

    // get user id from session
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id: userId } = session.user;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");

    //  get property by id:
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return NextResponse.json(
        { message: "Property not found." },
        { status: 404 }
      );
    }

    // verify if the user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // create a new propertyData object
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zip: formData.get("location.zip"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // update property in the database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return NextResponse.json(updatedProperty, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
