"use client";

import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { useGlobalContext } from "@/context/GlobalContext";

const SubmitMsgBtn = () => {
  const { pending } = useFormStatus();
  const { setUnreadCount } = useGlobalContext();
  return (
    <button
      className='bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
      type='submit'
      onClick={() => setUnreadCount((prev: number) => prev + 1)}
      disabled={pending}>
      <FaPaperPlane className=' mr-2' /> Send Message
    </button>
  );
};
export default SubmitMsgBtn;
