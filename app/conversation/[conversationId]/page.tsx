"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MessageItem from "../../components/message-item";
import { MessageType } from "../../util/types";

const Conversation: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [senderName, setSenderName] = useState<string>("");
  const { conversationId } = useParams();

  useEffect(() => {
    if (typeof conversationId === "string") {
      fetchMessages(conversationId);
    }
  }, [conversationId]);

  const fetchMessages = async (id: string) => {
    try {
      const response = await fetch(`/api/read-messages?conversationId=${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data: MessageType[] = await response.json();
      setMessages(data);
      if (data.length > 0) {
        setSenderName(data[0].sender.name);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSenderName("Error loading messages");
    }
  };

  return (
    <div className="flex flex-col h-[400px] rounded-t-xl overflow-y-auto bg-gray-50 dark:bg-gray-950 px-4 py-4">
      <div className="flex items-center justify-center">
        <img
          alt="Profile Picture"
          className="rounded-full border-dashed border-2 border-gray-300"
          height={64}
          src=""
          style={{
            aspectRatio: "64/64",
            objectFit: "cover",
          }}
          width={64}
        />
      </div>
      <div className="font-semibold text-lg text-center py-2">
        <h2>{senderName || "Loading..."} - Barre Client</h2>
      </div>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} preview={false} />
      ))}
    </div>
  );
};

export default Conversation;
