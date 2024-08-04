"use client";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <section className='bg-violet-100 min-h-screen flex-grow'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-violet-200 px-6 py-24 mb-4 shadow-2xl rounded-md border m-4 md:m-0'>
          <div className='flex justify-center'>
            <FaExclamationTriangle className='fas fa-exclamation-triangle fa-5x text-8xl text-fuchsia-400'></FaExclamationTriangle>
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold mt-4 mb-2'>Page Not Found</h1>
            <p className='text-gray-500 text-xl mb-10'>{error.toString()}</p>
            <Link
              href='/properties'
              className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded'>
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};
export default ErrorPage;
