import connectDB from "@/config/database";
import { getAuthUser } from "../actions/addProperty";
import { redirect } from "next/navigation";
import Message from "@/models/Message";
import { convertToObject } from "@/utils/convertJson";
import MessageCard from "@/components/MessageCard";

export const dynamic = "force-dynamic";

const MessagesPage = async () => {
  await connectDB();
  // get session user
  const sessionUser = await getAuthUser();
  if (!sessionUser) {
    redirect("/");
  }

  const userId = sessionUser?.id;
  // get read and unread messages
  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

    

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // get all messages
  const messages = [...unreadMessages, ...readMessages]?.map((messageDoc) => {
    // console.log("messageDoc", messageDoc);
    return {
      ...convertToObject(messageDoc),
      sender: convertToObject(messageDoc.sender),
      property: convertToObject(messageDoc.property),
    };
  });

  // console.log("messages", messages);

  return (
    <section className='bg-violet-100'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-violet-200 px-6 py-8 mb-4 shadow-2xl rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          {/* <Message /> */}

          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MessagesPage;
