import { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";
import { auth } from "@/auth";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const properties = await Property.find({});

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// post add property from: app/api/properties

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    //owner: get user id from session
    const session = await auth();
    console.log("session user:--> ", session);

    if (!session || !session.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { id: userId } = session.user;
    // console.log('userId: ', userId);

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    // console.log("amenities: ", amenities);
    const images = formData
      .getAll("images")
      .filter((image) => (image as File).name !== "");

    console.log("images: ", images);
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
      images: [] as string[],
    };

    console.log("propertyData", propertyData);

    // upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await (image as Blob).arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // convert image to base64
      const imageBase64 = imageData.toString("base64");

      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "property" }
      );
      imageUploadPromises.push(result.secure_url);

      // wait for all images to uploadc
      const uploadedImages = await Promise.all(imageUploadPromises);

      // add images to propertyData
      propertyData.images = uploadedImages;
    }

    console.log("propertyData: ", propertyData);

    const newProperty = new Property(propertyData);
    await newProperty.save();
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return NextResponse.json(
    //   { message: "success " },
    //   { status: 200 }
    // );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
