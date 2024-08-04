import Image from "next/image";
import profile from "@/assets/images/profile.png";

import { toast } from "react-toastify";
import type { IProperty } from "@/models/Property";
import connectDB from "@/config/database";
import { getAuthUser } from "../actions/addProperty";
import Property from "@/models/Property";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToObject } from "@/utils/convertJson";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  await connectDB();
  // get session user
  const sessionUser = await getAuthUser();
  const userId = sessionUser?.id;
  if (!userId) {
    redirect("/");
  }

  const propertiesDoc: IProperty[] = await Property.find({
    owner: userId,
  }).lean();

  if (!propertiesDoc) {
    return toast.error("No properties found");
  }

  // convert to object
  const properties: IProperty[] = propertiesDoc.map((property) =>
    convertToObject(property)
  );

  const profileImage = sessionUser?.image;
  const profileName = sessionUser?.name;
  const profileEmail = sessionUser?.email;

  return (
    <section className='bg-violet-100'>
      <div className='container m-auto py-24'>
        <div className='bg-violet-100 px-6 py-8 mb-4 shadow-2xl rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='shadow-2xl h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={profileImage || profile}
                  width={200}
                  height={200}
                  alt='User'
                />
              </div>
              <h2 className='text-xl mb-4'>
                <span className='font-bold block'>Name: </span> {profileName}
              </h2>
              <h2 className='text-md'>
                <span className='font-bold block'>Email: </span> {profileEmail}
              </h2>
            </div>

            {/* listings */}
            <div className=' mt-6 md:w-3/4 md:pl-4 '>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              {/* no property: */}
              {properties.length === 0 && <p>You have no property listings.</p>}

              {/* listing: */}
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
