"use client";

import type { IProperty } from "@/models/Property";
import { useSession } from "next-auth/react";
import { useState, type FormEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const PropertyContactForm = ({ property }: { property: IProperty }) => {
  const { data: session } = useSession();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setWasSubmitted(true);
      } else if (res.status === 401) {
        toast.error("Please login to send a message");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className='bg-violet-50 p-6 rounded-lg shadow-2xl'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      {!session ? (
        <p>You much be logged in to send a message.</p>
      ) : wasSubmitted ? (
        <p className='text-fuchsia-500 mb-4'>Message sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'>
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              placeholder='Enter your name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Enter your email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'>
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              type='text'
              placeholder='Enter your phone number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='message'>
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Enter your message'></textarea>
          </div>
          <div>
            <button
              className='bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
              type='submit'>
              <FaPaperPlane className=' mr-2'></FaPaperPlane> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default PropertyContactForm;
