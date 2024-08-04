"use client";

import { addMessage } from "@/app/actions/addMessage";
import type { IProperty } from "@/models/Property";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SubmitMsgBtn from "./SubmitMsgBtn";

const PropertyContactForm = ({ property }: { property: IProperty }) => {
  const { data: session } = useSession();
  const [state, formAction] = useFormState<any, any>(addMessage, {});
  // console.log("state", state);

  useEffect(() => {
    if (state.error) {
      toast.error("Error sending message");
    }
    if (state.submitted) {
      toast.success("Message sent successfully!");
    }
  }, [state]);

  if (state.submitted) {
    return <p className='text-fuchsia-500 mb-4'>Message sent successfully!</p>;
  }

  return (
    <div className='bg-violet-50 p-6 rounded-lg shadow-2xl'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      {!session ? (
        <p>You much be logged in to send a message.</p>
      ) : (
        <form action={formAction}>
          <input
            type='hidden'
            id='property'
            name='property'
            defaultValue={property._id}
          />
          <input
            type='hidden'
            id='recipient'
            name='recipient'
            defaultValue={property.owner}
          />
          <div className='mb-4'>
            {/* name */}
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'>
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              name='name'
              type='text'
              placeholder='Enter your name'
              required
            />
          </div>
          {/* email */}
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              required
            />
          </div>
          {/* phone */}
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'>
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              name='phone'
              type='text'
              placeholder='Enter your phone number'
            />
          </div>
          {/* message */}
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='body'>
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='body'
              name='body'
              placeholder='Enter your message'></textarea>
          </div>
          {/* button */}
          <div>
            <SubmitMsgBtn />
          </div>
        </form>
      )}
    </div>
  );
};
export default PropertyContactForm;
