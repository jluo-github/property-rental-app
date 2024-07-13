type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  handlePageChange: (newPage: number) => void;
};

const Pagination = ({
  page,
  pageSize,
  totalItems,
  handlePageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handlePageChange(newPage);
    }
  };

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      <button
        className='mr-2 px-2 py-1 border border-gray-300 rounded'
        onClick={() => handleChange(page - 1)}
        disabled={page === 1}>
        Previous
      </button>
      <span className='mx-2'>
        {" "}
        Page {page} of {totalPages}
      </span>
      <button
        className='ml-2 px-2 py-1 border border-gray-300 rounded'
        onClick={() => handleChange(page + 1)}
        disabled={page === totalPages}>
        Next
      </button>
    </section>
  );
};
export default Pagination;
