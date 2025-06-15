import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-4 py-3 border-b border-base-300 bg-gray-600 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side: Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-green-300">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover w-full h-full"
              />
            </div>
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">{selectedUser.fullName}</h3>
            <p className={`text-xs ${isOnline ? "text-green-500" : "text-gray-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right side: Close */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
          title="Close chat"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
