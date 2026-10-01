"use client";

import { MessageCircleMore, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";


type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function Chatbox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [openDialogue, setOpenDialogue] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const api_url = process.env.NEXT_PUBLIC_API_URL!;


    // This scrolls the chat to the bottom whenever a user sends a new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);




    async function sendMessage() {
        const question = input.trim();

        if (!question || loading) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: question,
            },
        ]);

        setInput("");
        setLoading(true);

        try {
            const response = await fetch(
                api_url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.answer,
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Sorry, I’m unable to connect to the support service right now. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="fixed bottom-6 right-2 md:right-6 z-50">

            {openDialogue ? (
                /* CHAT WINDOW */
                <div className="flex h-[450px] md:h-[600px] w-full max-w-[300px] md:max-w-[400px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-700 px-3 py-4">
                        <div>
                            <h2 className="text-lg font-semibold font-poppins ">
                                Chat with Grey
                            </h2>

                            <p className="text-sm text-gray-500 font-sans ">
                                TheGreyIT support assistant
                            </p>
                        </div>

                        <button
                            onClick={() => setOpenDialogue(false)}
                            className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-full text-red-700 hover:bg-gray-100 hover:text-red-800"
                        >
                            <X size={17} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 space-y-4 overflow-y-auto p-5">

                        {messages.length === 0 && (
                            <div className="flex h-full items-center justify-center text-center text-gray-500 font-poppins ">
                                <div>
                                    <p className="font-medium">
                                        👋 Hi, I’m Grey.
                                    </p>

                                    <p className="mt-1 text-sm">
                                        How can I help you today?
                                    </p>
                                </div>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex font-poppins ${message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    } `}
                            >
                                <div
                                    className={` w-fit max-w-[80%] rounded-xl px-4 py-3 text-xs md:text-sm font-poppins ${message.role === "user"
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100 text-gray-900"
                                        } `}
                                >
                                    {message.role === "assistant" ? (
                                        <div className="text-xs md:text-sm font-poppins leading-6">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => (
                                                        <p className="mb-3 last:mb-0">
                                                            {children}
                                                        </p>
                                                    ),

                                                    ul: ({ children }) => (
                                                        <ul className="mb-3 ml-5 list-disc space-y-2">
                                                            {children}
                                                        </ul>
                                                    ),

                                                    ol: ({ children }) => (
                                                        <ol className="mb-3 ml-5 list-decimal space-y-2">
                                                            {children}
                                                        </ol>
                                                    ),

                                                    li: ({ children }) => (
                                                        <li className="pl-1">
                                                            {children}
                                                        </li>
                                                    ),

                                                    strong: ({ children }) => (
                                                        <strong className="font-semibold">
                                                            {children}
                                                        </strong>
                                                    ),

                                                    em: ({ children }) => (
                                                        <em className="italic">
                                                            {children}
                                                        </em>
                                                    ),

                                                    a: ({ children, href }) => (
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="underline"
                                                        >
                                                            {children}
                                                        </a>
                                                    ),
                                                }}
                                            >
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        message.content
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading */}
                        {loading && (
                            <div className="flex justify-start">
                                {/* <div className="rounded-2xl bg-gray-100 px-4 py-3 text-xs text-gray-500 font-poppins ">
                                    Grey is typing...
                                </div> */}

                                <Image src={"/loading_dots.gif"} alt="loading" height={1000} width={1000} className="w-16  " />
                            </div>
                        )}
                    </div>

                    {/* Scroll target */}
                    <div ref={messagesEndRef} />

                    {/* Input */}
                    <div className="border-t border-gray-700 p-4">
                        <div className="flex items-end gap-2">

                            <textarea
                                value={input}
                                onChange={(event) =>
                                    setInput(event.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Ask Grey something..."
                                rows={1}
                                className=" min-h-[80px] flex-1 resize-none rounded-xl border border-gray-700 px-4 py-3 text-sm font-poppins  outline-none "
                            />

                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || loading}
                                className="rounded-xl bg-gray-700 cursor-pointer px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 font-poppins "
                            >
                                Send
                            </button>

                        </div>

                        <p className="mt-4 text-center text-xs text-gray-400 font-poppins  ">
                            Grey provides information about TheGreyIT.
                        </p>
                    </div>
                </div>
            ) : (
                /* FLOATING CHAT BUTTON */
                <button
                    onClick={() => setOpenDialogue(true)}
                    className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-2xl text-white shadow-xl transition hover:scale-105"
                    aria-label="Open Grey chat">
                    <MessageCircleMore />
                </button>
            )
            }

        </div >
    );
}
