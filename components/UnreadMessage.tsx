"use client";

import { useGlobalContext } from "@/context/GlobalContext";

const UnreadMessageCount = ({ session }: { session: any }) => {
  const { unreadCount } = useGlobalContext();

  if (!session) return;

  return (
    unreadCount > 0 && (
      <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-fuchsia-500 rounded-full'>
        {unreadCount}
      </span>
    )
  );
};
export default UnreadMessageCount;
