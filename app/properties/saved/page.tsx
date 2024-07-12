"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import type { IProperty } from "@/models/Property";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
      return;
    }
    const fetchSavedProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/bookmarks");

        if (!res.ok) {
          toast.error("Failed to fetch saved properties.");
          return;
        }
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [session]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <h1 className='text-2xl mb-4'>Saved properties</h1>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
