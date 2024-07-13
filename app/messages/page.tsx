"use client";

import Messages from "@/components/Messages";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MessagesPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/");
    return;
  }

  return <Messages />;
};
export default MessagesPage;
