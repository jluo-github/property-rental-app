import { getAuthUser } from "@/app/actions/addProperty";
import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property, { type IProperty } from "@/models/Property";
import { convertToObject } from "@/utils/convertJson";
import { redirect } from "next/navigation";

const PropertyEditPage = async ({ params }: { params: { id: string } }) => {
  let property: IProperty | null = null;

  const { id } = params;
  await connectDB();
  const sessionUser = await getAuthUser();
  const userId = sessionUser?.id;
  if (!userId) {
    redirect("/");
  }

  // get property by id
  const propertyDoc: IProperty | null = await Property.findById(id).lean();
  if (!propertyDoc) {
    return;
  }
  property = convertToObject(propertyDoc);

  return (
    <section className='bg-violet-100'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-violet-50 px-6 py-8 mb-4 shadow-2xl rounded-md border m-4 md:m-0'>
          {property && <PropertyEditForm property={property} />}
        </div>
      </div>
    </section>
  );
};
export default PropertyEditPage;
