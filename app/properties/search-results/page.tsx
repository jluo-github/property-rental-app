import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import type { IProperty } from "@/models/Property";
import connectDB from "@/config/database";
import Property from "@/models/Property";

type SearchResultsPageProps = {
  searchParams: {
    location: string;
    propertyType: string;
  };
};

type Query = {
  $or: {
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    "location.street"?: { $regex: string; $options: string };
    "location.city"?: { $regex: string; $options: string };
    "location.state"?: { $regex: string; $options: string };
    "location.zip"?: { $regex: string; $options: string };
  }[];
  type?: RegExp;
};

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}: SearchResultsPageProps) => {
  await connectDB();

  // Create a query object to search for properties
  let query: Query = {
    $or: [
      { name: { $regex: location, $options: "i" } },
      { description: { $regex: location, $options: "i" } },
      { "location.street": { $regex: location, $options: "i" } },
      { "location.city": { $regex: location, $options: "i" } },
      { "location.state": { $regex: location, $options: "i" } },
      { "location.zip": { $regex: location, $options: "i" } },
    ],
  };

  // Only check for property if its not 'All'
  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  // get properties by location and property type
  const properties: IProperty[] = await Property.find(query);
  // console.log("Properties Found:", properties.length);

  return (
    <>
      {/* search form */}
      <section className='bg-violet-700 py-4 mb-12'>
        <div className='max-w-7xl mx-auto  px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>

      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          {/* back link */}
          <Link
            href='/properties'
            className='flex items-center text-violet-500 hover:underline mb-3'>
            <FaArrowAltCircleLeft className='text-2xl mr-2 mb-2' /> Back to
            Properties
          </Link>

          {/*search results */}
          <h1 className='text-2xl my-12'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default SearchResultsPage;
