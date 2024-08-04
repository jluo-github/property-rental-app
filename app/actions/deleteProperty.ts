"use server";

import connectDB from "@/config/database";
import Property, { type IProperty } from "@/models/Property";
import cloudinary from "@/config/cloudinary";
import { revalidatePath } from "next/cache";
import { getAuthUser, getError } from "./addProperty";
export const deleteProperty = async (propertyId: string) => {
  try {
    await connectDB();
    // get session user
    const sessionUser = await getAuthUser();
    const userId = sessionUser?.id;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // find property by id
    const property: IProperty | null = await Property.findById(propertyId);
    if (!property) {
      throw new Error("Property not found");
    }
    if (!property) {
      throw new Error("Property not found");
    }

    // check if user is the owner
    if (property.owner !== userId) {
      throw new Error("Unauthorized");
    }

    // delete images id from db
    const imageIds = property.images.map((imageUrl) => {
      const imageId = imageUrl.split("/").pop()?.split(".")[0];
      return imageId;
    });

    // delete images from cloudinary
    if (imageIds.length > 0) {
      for (let imageId of imageIds) {
        await cloudinary.uploader.destroy(`property/${imageId}`);
      }
    }
    // delete property
    await Property.findByIdAndDelete(propertyId);

    revalidatePath(`/properties/${propertyId}`);
  } catch (error) {
    return getError(error);
  }
};
