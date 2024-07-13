"use client";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import type { IProperty } from "@/models/Property";

const Properties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  // add pagination
  const [pageSize, setPageSize] = useState<number>(9);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const { properties, total } = await res.json();
        setProperties(properties);
        setTotalItems(total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {

    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
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

        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
export default Properties;
