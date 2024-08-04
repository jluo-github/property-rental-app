import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import type { IProperty } from "@/models/Property";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();

  const recentProperties: IProperty[] = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-violet-500 mb-12 text-center'>
            Recent Properties
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 ? (
              <p>No properties found.</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-16 px-6'>
        <Link
          href='/properties'
          className='block bg-violet-600 text-white text-center py-4 px-6 rounded-xl hover:bg-violet-800'>
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;
