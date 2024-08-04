import FeaturedPropertyCard from "./FeaturedPropertyCard";
import type { IProperty } from "@/models/Property";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const FeaturedProperties = async () => {
  await connectDB();
  // fetch featured properties
  const properties: IProperty[] = await Property.find({
    isFeatured: true,
  })
    .limit(4)
    .lean();

  return (
    properties.length > 0 && (
      <section className='bg-violet-50 px-4 pt-6 pb-10 my-12 '>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-violet-500 my-12  text-center'>
            Featured Properties
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-12 '>
            {properties.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};
export default FeaturedProperties;
