"use server";

import { auth } from "@/auth";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// error helper function
export const getError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};
// get session user
export const getAuthUser = async () => {
  await connectDB();
  //owner: get user id from session
  const session = await auth();
  // console.log("session user:--> ", session);

  if (!session || !session.user) {
    return null;
  }
  return session.user;
};

export const addProperty = async (formData: FormData) => {
  await connectDB();
  // get session user
  const sessionUser = await getAuthUser();
  const userId = sessionUser?.id;
  if (!userId) {
    return;
  }
  // console.log('userId: ', userId);
  // get images
  const images = formData
    .getAll("images")
    .filter((image) => (image as File).name !== "");
  // console.log("images: ", images);

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
    amenities: formData.getAll("amenities"),
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

  // upload images to cloudinary
  const imageUrls = [];
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
    imageUrls.push(result.secure_url);
  }
  propertyData.images = imageUrls;

  // console.log("propertyData", propertyData);

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/properties/add");

  redirect(`/properties/${newProperty._id}`);
};
