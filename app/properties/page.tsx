import PropertyCard from "@/components/PropertyCard";
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
      {" "}
      <section className='bg-violet-50 px-4 pt-6 pb-10'>
        <div className='container-xl lg:container m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {properties.map((property) => (
              <div key={property._id}>
                <PropertyCard property={property} />
              </div>
            ))}
            {/* <PropertySearchForm /> */}
          </div>
        </div>
      </section>
      {/* {<Properties />} */}
    </>
  );
};
export default PropertiesPage;
