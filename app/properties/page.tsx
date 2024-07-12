import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import type { IProperty } from "@/models/Property";
import { fetchProperties } from "@/utils/requests";

const PropertiesPage = async () => {
  const properties: IProperty[] = await fetchProperties();

  if (properties.length > 0) {
    properties.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
    );
  }

  return (
    <>
      <section className='bg-violet-700 py-4 mb-12'>
        <div className='max-w-7xl mx-auto  px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>

      <section className='bg-violet-50 px-4 pt-6 pb-10'>
        <div className='container-xl lg:container m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {properties.map((property) => (
              <div key={property._id}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default PropertiesPage;
