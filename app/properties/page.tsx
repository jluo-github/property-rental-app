import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Pagination from "@/components/Pagination";
import connectDB from "@/config/database";
import type { IProperty } from "@/models/Property";
import Property from "@/models/Property";

type Props = {
  searchParams: {
    page: number;
    pageSize: number;
  };
};

const PropertiesPage = async ({ searchParams }: Props) => {
  // console.log(searchParams);
  // get page and pageSize from searchParams
  const { page = 1, pageSize = 9 } = searchParams;

  await connectDB();
  // skip
  const skip: number = (page - 1) * pageSize;
  // total properties
  const total: number = await Property.countDocuments({});

  // mongoose query to get properties with pagination
  const properties: IProperty[] | null = await Property.find({})
    .skip(skip)
    .limit(pageSize);

  if (!properties)
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        No properties found
      </h1>
    );

  return (
    <>
      <section className='bg-violet-700 py-4 mb-12'>
        <div className='max-w-7xl mx-auto  px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>

      {/* Properties */}
      <section className='px-4 py-6 my-12'>
        <div className='container-xl lg:container m-auto px-4 py-12 '>
          {properties && properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties &&
                properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
            </div>
          )}
          {/* pagination */}

          <Pagination page={+page} pageSize={+pageSize} totalItems={total} />
        </div>
      </section>
    </>
  );
};
export default PropertiesPage;
