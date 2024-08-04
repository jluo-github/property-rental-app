"use client";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { FaBookmark } from "react-icons/fa";
import type { IProperty } from "@/models/Property";
import { bookmark } from "@/app/actions/bookmark";
import { checkBookmark } from "@/app/actions/checkBookmark";
import { useEffect, useState } from "react";

const BookmarkButton = ({ property }: { property: IProperty }) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    // check bookmark status
    const checkBookmarkStatus = async () => {
      const res = await checkBookmark(property._id);
      if (res && "isBookmarked" in res) setBookmarked(res.isBookmarked);
    };
    checkBookmarkStatus();
  }, [property._id, userId, bookmarked]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please login to bookmark this property");
      return;
    }
    try {
      setLoading(true);
      // update bookmark
      const res = await bookmark(property._id);
      if (res && "isBookmarked" in res) setBookmarked(res.isBookmarked);

      toast.success(res.message);
    } catch (error) {
      toast.error("Error bookmarking property");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button className='bg-violet-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
        <FaBookmark className='mr-2' /> Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        bookmarked
          ? "bg-fuchsia-400 hover:bg-fuchsia-500"
          : "bg-violet-500 hover:bg-violet-600"
      } text-white font-bold w-full py-2 px-4 rounded-full duration-200 flex items-center justify-center `}>
      <FaBookmark className=' mr-2' />{" "}
      {bookmarked ? "Remove Bookmark" : "Bookmark"}
    </button>
  );
};
export default BookmarkButton;
