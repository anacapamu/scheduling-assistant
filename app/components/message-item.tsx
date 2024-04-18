import Link from "next/link";
import React from "react";
import { MessageSchema } from "../util/types";
import Heart from "./heart";

interface Props {
  message: MessageSchema;
  preview?: boolean;
  currentUserId?: string;
}

const MessageItem: React.FC<Props> = ({
  message,
  preview = false,
  currentUserId,
}) => {
  const isCurrentUser = message.sender.id === currentUserId;
  const content = preview
    ? message.content.length > 100
      ? `${message.content.substring(0, 100)}...`
      : message.content
    : message.content;

  const hasThanks = /thanks|thank you/i.test(message.content);

  const timestamp = new Date(message.timestamp);
  const timeStr = `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, "0")}`;

  return (
    <Link href={`/conversation/${message.conversationId}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
        }}
      >
        {preview ? <h4>{message.sender.name}</h4> : ""}
        <div
          className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} max-w-[75%]`}
        >
          <p
            className={`rounded-lg ${isCurrentUser ? "rounded-tr-none bg-orange-500 text-white" : "rounded-tl-none bg-gray-100 dark:bg-gray-900"} p-4 text-sm break-words`}
          >
            {content} {hasThanks && <Heart color="red" />}
          </p>
          <p className="text-xs text-gray-500 mt-1">{timeStr}</p>
        </div>
      </div>
    </Link>
  );
};

export default MessageItem;
