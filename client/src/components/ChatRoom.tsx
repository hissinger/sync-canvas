import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { useSyncRoomContext } from "../contexts/SyncRoomContext";
import type { ChatMessage } from "../types/chat";

const CHAT_CONSTANTS = {
  INPUT: {
    MIN_HEIGHT: 40,
    MAX_HEIGHT: 120,
    LINE_HEIGHT: 20,
  },
} as const;

interface ChatRoomProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatRoom({ isOpen, onClose }: ChatRoomProps) {
  const { userId, chatMessages, send, isSending } = useSyncRoomContext();

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const formatTime = (date: number) => {
    return new Date(date).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = `${CHAT_CONSTANTS.INPUT.MIN_HEIGHT}px`;
      const scrollHeight = textArea.scrollHeight;
      textArea.style.height = `${Math.min(
        scrollHeight,
        CHAT_CONSTANTS.INPUT.MAX_HEIGHT
      )}px`;
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen && textAreaRef.current) {
      textAreaRef.current.style.height = `${CHAT_CONSTANTS.INPUT.MIN_HEIGHT}px`;
    }

    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const payload: ChatMessage = {
      message: inputMessage,
      type: "text",
    };

    send(JSON.stringify(payload));
    setInputMessage("");

    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${CHAT_CONSTANTS.INPUT.MIN_HEIGHT}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    // handle Enter key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    adjustTextAreaHeight();
  };

  return (
    <div
      ref={chatPanelRef}
      className={`h-full w-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
        isOpen ? "flex" : "hidden"
      } flex-col`}
    >
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-300">
        <h3 className="m-0 text-sm font-normal">Chat</h3>
        <button
          onClick={onClose}
          className="bg-none border-none cursor-pointer p-1"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {chatMessages.map((msg, index) => {
          const msgData = JSON.parse(msg.message) as ChatMessage;
          if (msgData.type === "joined") {
            return (
              <div
                key={index}
                className="mb-4 text-center text-xs text-gray-500 w-full"
              >
                <>
                  <span>
                    <strong className="font-bold">{msgData.message}</strong>{" "}
                    님이 입장하셨습니다.
                  </span>
                  <div className="text-[10px] text-gray-400">
                    {formatTime(msg.timestamp)}
                  </div>
                </>
              </div>
            );
          }

          const isMine = msg.from?.identity === userId;
          return (
            <div
              key={index}
              className={`mb-4 flex flex-col ${
                isMine ? "items-end" : "items-start"
              } max-w-full`}
            >
              {!isMine && (
                <span className="text-xs text-gray-600 mb-1 font-medium">
                  {msg.from?.name || "Unknown User"}:
                </span>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  isMine ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                } break-words whitespace-pre-wrap`}
              >
                <p className="m-0 text-sm">{msgData.message}</p>
              </div>
              <span className="text-[11px] text-gray-600 mt-1">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-300 bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textAreaRef}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none resize-none transition-[height] duration-100 ease-in-out"
            style={{
              minHeight: `${CHAT_CONSTANTS.INPUT.MIN_HEIGHT}px`,
              maxHeight: `${CHAT_CONSTANTS.INPUT.MAX_HEIGHT}px`,
              lineHeight: `${CHAT_CONSTANTS.INPUT.LINE_HEIGHT}px`,
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isSending}
            className="px-3 py-2 text-white border-none rounded-lg cursor-pointer h-10 flex-shrink-0"
          >
            <Send size={25} strokeWidth={2} color={"#0d6efd"} />
          </button>
        </div>
      </div>
    </div>
  );
}
