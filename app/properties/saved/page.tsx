import connectDB from "@/config/database";
import PropertyCard from "@/components/PropertyCard";

import User from "@/models/User";
import type { IProperty } from "@/models/Property";
const { getAuthUser } = await import("@/app/actions/addProperty");

const SavedPropertiesPage = async () => {
  await connectDB();
  // get session user
  const sessionUser = await getAuthUser();
  const userId = sessionUser?.id;

  // get user bookmarks
  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  // console.log("bookmarks: ", bookmarks);

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
      <h1 className='text-2xl mb-12'>Saved properties</h1>
        {bookmarks.length === 0 && <p>No saved properties</p>}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {bookmarks.map((property: IProperty) => (
            <PropertyCard property={property} key={property._id} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
