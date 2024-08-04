"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.png";
import profile from "@/assets/images/profile.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useOutsideClick } from "./useOutsideClick";
import UnreadMessageCount from "./UnreadMessage";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { data: session } = useSession();
  // console.log("session:-->", session);

  const pathname = usePathname();

  // close the profile menu when clicked outside
  // const ref = useOutsideClick(() => {
  //   setProfileMenuOpen(false);
  // });

  useEffect(() => {
    window.addEventListener("resize", () => setMobileMenuOpen(false));
  }, []);

  return (
    <nav className='bg-violet-700 border-b border-violet-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-violet-400 hover:bg-violet-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'>
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>

          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* Logo  */}
            <Link className='flex flex-shrink-0 items-center' href='/'>
              <Image src={logo} className='h-10 w-auto' alt='PurpleCatRental' />

              <span className='hidden md:block text-white text-lg font-bold ml-2 '>
                PurpleCat Rental
              </span>
            </Link>

            {/* Desktop Menu Hidden below md screens  */}
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                {/* Home  */}
                <Link
                  href='/'
                  className={`${
                    pathname === "/" ? "bg-violet-900" : ""
                  } text-white  hover:bg-violet-900 hover:text-white rounded-md px-3 py-2`}>
                  Home
                </Link>
                {/* properties */}
                <Link
                  href='/properties'
                  className={`${
                    pathname === "/properties" ? "bg-violet-900" : ""
                  } text-white  hover:bg-violet-900 hover:text-white rounded-md px-3 py-2`}>
                  Properties
                </Link>
                {/* add property if logged in*/}
                {session && (
                  <Link
                    href='/properties/add'
                    className={`${
                      pathname === "/properties/add" ? "bg-violet-900" : ""
                    } text-white  hover:bg-violet-900 hover:text-white rounded-md px-3 py-2`}>
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Menu (Logged Out)  */}
          {!session && (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                {/* login button */}
                <Link href='/api/auth/signin'>
                  <button className='flex items-center text-white bg-violet-700 hover:bg-violet-900 hover:text-white rounded-md px-3 py-2'>
                    <span>Login or Register</span>
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Right Side Menu (Logged In)  */}
          {session && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
              <Link href='/messages' className='relative group'>
                <button
                  type='button'
                  className='relative rounded-full bg-violet-800 p-1 text-violet-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-800'>
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </button>

                {/* unread count  */}
                <UnreadMessageCount session={session} />
              </Link>

              {/* profile */}
              <div className='relative ml-3'>
                <div>
                  {/* Profile dropdown button */}
                  <button
                    onClick={() => setProfileMenuOpen((prev) => !prev)}
                    type='button'
                    className='relative flex rounded-full bg-violet-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-800'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'>
                    <span className='absolute -inset-1.5'></span>
                    <span className='sr-only'>Open user menu</span>
                    {session?.user?.name && session?.user?.image ? (
                      <Image
                        className='h-8 w-8 rounded-full'
                        src={session.user.image}
                        alt={session.user.name}
                        width={38}
                        height={38}
                      />
                    ) : (
                      <Image
                        className='h-8 w-8 rounded-full'
                        src={profile}
                        alt='profile picture'
                      />
                    )}
                  </button>
                </div>

                {/* Profile dropdown  */}
                {profileMenuOpen && (
                  <div
                    id='user-menu'
                    className=' absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-violet-900 ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}>
                    <Link
                      onClick={() => setProfileMenuOpen(false)}
                      href='/profile'
                      className='block px-4 py-2 text-sm text-violet-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-0'>
                      Your Profile
                    </Link>
                    <Link
                      onClick={() => setProfileMenuOpen(false)}
                      href='/properties/saved'
                      className='block px-4 py-2 text-sm text-violet-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-2'>
                      Saved Properties
                    </Link>

                    {/* sign out button */}
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        signOut();
                      }}
                      className='block px-4 py-2 text-sm text-violet-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-2'>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state.  */}
      {mobileMenuOpen && (
        <div id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            {/* Home */}
            <Link
              href='/'
              className={`${
                pathname === "/" ? "bg-violet-900" : ""
              }text-white block rounded-md px-3 py-2 text-base font-medium`}>
              Home
            </Link>
            {/* properties */}
            <Link
              href='/properties'
              className={`${
                pathname === "/properties" ? "bg-violet-900" : ""
              }text-white block rounded-md px-3 py-2 text-base font-medium`}>
              Properties
            </Link>

            {/* add property if logged in*/}
            {session && (
              <Link
                href='/properties/add'
                className={`${
                  pathname === "/properties/add" ? "bg-violet-900" : ""
                }text-white block rounded-md px-3 py-2 text-base font-medium`}>
                Add Property
              </Link>
            )}

            {/* login button */}
            {!session && (
              <Link href='/api/auth/signin'>
                <button className='flex items-center text-white bg-violet-700 hover:bg-violet-900 hover:text-white rounded-md px-3 py-2 my-4'>
                  <span>Login or Register</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
