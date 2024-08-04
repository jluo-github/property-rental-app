"use server";

import connectDB from "@/config/database";
import Property, { type IProperty } from "@/models/Property";
import { getAuthUser } from "./addProperty";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateProperty = async (
  propertyId: string,
  formData: FormData
) => {
  await connectDB();
  const sessionUser = await getAuthUser();
  const userId = sessionUser?.id;
  if (!userId) {
    return;
  }

  // find property by id
  const property: IProperty | null = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }
  // check if user is the owner
  if (property.owner !== userId) {
    throw new Error("Unauthorized");
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
  };

  // update property
  await Property.findByIdAndUpdate(propertyId, propertyData);
  revalidatePath(`/properties/${propertyId}`);
  redirect(`/properties/${propertyId}`);
};
