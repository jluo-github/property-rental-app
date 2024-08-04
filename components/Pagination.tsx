import Link from "next/link";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
};

const Pagination = ({ page, pageSize, totalItems }: PaginationProps) => {
  const totalPages: number = Math.ceil(totalItems / pageSize);

  return (
    <section className='container mx-auto flex justify-center items-center my-12'>
      {page > 1 ? (
        <Link
          className='mr-2 px-2 py-1 border border-violet-400 rounded '
          href={`/properties?page=${page - 1}`}>
          Previous
        </Link>
      ) : (
        <button className='mr-2 px-2 py-1 border border-gray-300 cursor-not-allowed disabled rounded '>
          Previous
        </button>
      )}

      <span className='mx-2'>
        {" "}
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className='ml-2 px-2 py-1 border border-violet-400 rounded '>
          Next
        </Link>
      ) : (
        <button className='ml-2 px-2 py-1 border border-gray-300 cursor-not-allowed disabled rounded '>
          next
        </button>
      )}
    </section>
  );
};
export default Pagination;
