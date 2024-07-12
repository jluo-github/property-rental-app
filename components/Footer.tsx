import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className='bg-violet-300 py-4 mt-auto'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
        <div className='mb-4 md:mb-0'>
          <Image src={logo} alt='Logo' className='h-10 w-auto rounded-full' />
        </div>

        <div>
          <p className='text-sm text-gray-600 mt-2 md:mt-0'>
            &copy; {date} Property. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
