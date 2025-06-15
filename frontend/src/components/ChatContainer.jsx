import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => {
          const isSelf = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? messageEndRef : null}
              className={`chat ${isSelf ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full shadow-md border border-base-300">
                  <img
                    src={
                      isSelf
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="chat-header text-sm text-gray-500 mb-1">
                <time className="ml-1 text-xs">{formatMessageTime(message.createdAt)}</time>
              </div>

              <div className="chat-bubble bg-green-100 text-gray-800 rounded-lg px-4 py-2 shadow-sm max-w-xs break-words">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[180px] rounded-lg mb-2 shadow"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-base-300 p-2 bg-gray-600 shadow-inner">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
