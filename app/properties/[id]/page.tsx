import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import type { IProperty } from "@/models/Property";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";

import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToObject } from "@/utils/convertJson";

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const { id } = params;
  // get property by id
  const propertyDoc: IProperty | null = await Property.findById(id).lean();

  if (!propertyDoc) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property not found
      </h1>
    );
  }
  const property: IProperty = convertToObject(propertyDoc);

  return (
    <>
      {property && (
        <>
          {/* image */}
          <PropertyHeaderImage image={property.images[0]} />

          {/* go back */}
          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/properties'
                className='text-violet-500 hover:text-violet-600 flex items-center'>
                {/*back arrow */}
                <FaArrowLeft className=' mr-2'></FaArrowLeft> Back to Properties
              </Link>
            </div>
          </section>

          {/* property details */}
          <section className='bg-violet-100'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                {/* property details */}
                <PropertyDetails property={property} />

                {/*  Sidebar */}
                <aside className='space-y-4'>
                  {/* bookmark button */}
                  <BookmarkButton property={property} />
                  {/* share button */}
                  <ShareButtons property={property} />
                  {/* Contact Form */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>

          {/* property images */}
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};
export default PropertyPage;
