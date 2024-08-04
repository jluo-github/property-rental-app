"use client";

import type { IMessage } from "@/models/Message";
import Link from "next/link";
import { markMessage } from "@/app/actions/markMessage";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteMessage } from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }: { message: IMessage }) => {
  const [isRead, setIsRead] = useState<boolean>(message.read || false);
  const { setUnreadCount } = useGlobalContext();

  const handleClick = async () => {
    const read = await markMessage(message._id);
    setIsRead(read);
    // update unread count
    setUnreadCount((prev: number) => (read ? prev - 1 : prev + 1));
    toast.success(read ? `Marked as read` : "Mark as new");
  };

  const handleDelete = async () => {
    await deleteMessage(message._id);
    // update unread count
    setUnreadCount((prev: number) => (isRead ? prev : prev - 1));
    toast.success("Message deleted");
  };

  return (
    <div className='relative  bg-violet-50  p-4 rounded-md shadow-2xl border border-gray-200'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-violet-500 text-white px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry: </span>
        {message.property.name}
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
      {/*read button */}
      <button
        onClick={handleClick}
        className={` mt-4 mr-3  ${
          isRead ? " bg-violet-300 " : "bg-violet-500 text-white "
        }    py-1 px-3 rounded-md `}>
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>

      {/* delete button */}
      <button
        onClick={handleDelete}
        className='mt-4 bg-fuchsia-400 hover:bg-fuchsia-500 text-white  py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};
export default MessageCard;
