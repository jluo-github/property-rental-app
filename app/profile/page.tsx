"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profile from "@/assets/images/profile.png";

import { toast } from "react-toastify";
import type { IProperty } from "@/models/Property";
import Spinner from "@/components/Spinner";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Error fetching user properties", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );

        setProperties(updatedProperties);
        toast.success("Property deleted");
      } else {
        toast.error("Error deleting property");
      }
    } catch (error) {
      toast.error("Error deleting property");
    }
  };
  return (
    <section className='bg-violet-100'>
      <div className='container m-auto py-24'>
        {/* <div className='bg-violet-100 px-6 py-8 mb-4 shadow-2xl rounded-md border m-4 md:m-0'> */}
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
            {!loading && properties.length === 0 && (
              <p>You have no property listings.</p>
            )}
            {/* listing: */}vb
            {loading ? (
              <Spinner loading={loading} />
            ) : (
              properties.map((property, index) => (
                <div className='mb-10' key={index}>
                  <Link href={`/properties/${property._id}`}>
                    <Image
                      className='shadow-2xl h-32 w-full rounded-md object-cover'
                      src={property.images[0]}
                      width={300}
                      height={100}
                      priority={true}
                      alt='Property'
                    />
                  </Link>

                  <div className='mt-2'>
                    <p className='text-lg font-semibold'>{property.name}</p>
                    <p className='text-gray-600'>
                      Address: {property.location.street}{" "}
                      {property.location.city} {property.location.state}
                    </p>
                  </div>
                  <div className='mt-2'>
                    {/* edit button */}
                    <Link
                      href={`/properties/${property._id}/edit`}
                      className='bg-violet-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-violet-600'>
                      Edit
                    </Link>

                    {/* delete button*/}
                    <button
                      onClick={() => handleDeleteProperty(property._id)}
                      className='bg-fuchsia-500  text-white px-3 py-2 rounded-md hover:bg-fuchsia-600'
                      type='button'>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};
export default ProfilePage;
