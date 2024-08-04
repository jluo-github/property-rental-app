"use client";
import type { IProperty } from "@/models/Property";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteProperty } from "@/app/actions/deleteProperty";

const ProfileProperties = ({
  properties: initProperties,
}: {
  properties: IProperty[];
}) => {
  const [properties, setProperties] = useState<IProperty[]>(initProperties);

  const handleDelete = async (propertyId: string) => {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete this property?"
      );
      if (!confirmDelete) {
        return;
      }
      // delete property by id
      await deleteProperty(propertyId);
      // update state
      const updatedProperties = properties.filter(
        (property) => property._id !== propertyId
      );
      setProperties(updatedProperties);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const ownerProperties = properties.map((property, index) => (
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
          Address: {property.location.street} {property.location.city}{" "}
          {property.location.state}
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
          className='bg-fuchsia-500  text-white px-3 py-2 rounded-md hover:bg-fuchsia-600'
          type='button'
          onClick={() => handleDelete(property._id)}>
          Delete
        </button>
      </div>
    </div>
  ));

  return <div>{ownerProperties}</div>;
};
export default ProfileProperties;
