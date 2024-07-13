"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";
import type { IMessage } from "@/models/Message";

const Message = ({ message }: { message: IMessage }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);

        setUnreadCount((prevCount: number) =>
          read ? prevCount - 1 : prevCount + 1
        );
        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error((error as Error).message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setIsDeleted(true);

        setUnreadCount((prevCount: number) => prevCount - 1);
        toast.success("Message Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className='relative  bg-violet-50  p-4 rounded-md shadow-2xl border border-gray-200'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-purple-300 text-gray-700 px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry: </span>
        {message.property.name }
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Name: </strong>
          {message.name}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <Link href={`mailto:${message.email}`} className='text-violet-500'>
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <Link href={`tel:${message.phone}`} className='text-violet-500'>
            {message?.phone}
          </Link>
        </li>
        <li>
          <strong>Received: </strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      {/* button */}
      <button
        onClick={handleReadClick}
        className={` mt-4 mr-3  ${
          isRead ? " bg-violet-300 " : "bg-violet-500 text-white "
        }    py-1 px-3 rounded-md `}>
        {" "}
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>

      <button
        onClick={handleDelete}
        className='mt-4 bg-fuchsia-400 hover:bg-fuchsia-500 text-white  py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};
export default Message;
