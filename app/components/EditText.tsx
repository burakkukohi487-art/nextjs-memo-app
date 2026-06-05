"use client"

import { Memo } from "../types/memo"
import { updateMemo, deleteMemo } from "../lib/memoService";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function EditText(memo: Memo) {
    const router = useRouter();
    const [editText, setEditText] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editStatus, setEditStatus] = useState(false);
    const [text, setText] = useState(memo.text);
    const [title, setTitle] = useState(memo.title);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = (textareaRef.current.scrollHeight + 2) + "px";
        }
    }, [editText, editStatus])

    const startEdit = () => {
        setEditStatus(true);
        setEditTitle(title);
        setEditText(text);
    }

    const saveEdit = () => {
        if (!editTitle) {
            alert("タイトルは空欄にできません")
            return
        };
        setTitle(editTitle);
        setText(editText);

        updateMemo(memo.id, editTitle, editText);

        setEditStatus(false);
    }


    const cancelEdit = () => {
        setEditTitle("");
        setEditText("");
        setEditStatus(false);
    }

    if (editStatus) {
        return (<>
            <input
                type="text"
                value={editTitle}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                onChange={(e) => setEditTitle(e.target.value)}
                className="block w-full text-2xl font-bold underline mb-6 break-all outline-none border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-400 transition-shadow"
            />
            <textarea
                ref={textareaRef}
                value={editText}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        saveEdit();
                    }
                }}
                onChange={(e) => setEditText(e.target.value)}
                className="block w-full mb-6 outline-none border border-gray-300 p-2 rounded-xl whitespace-pre-wrap overflow-hidden resize-none focus:ring-1 focus:ring-blue-400 transition-shadow"
            />
            <div className="flex justify-around">
                <button
                    onClick={saveEdit}
                    className="bg-blue-400 text-white px-4 py-2 rounded-xl outline-none hover:bg-blue-500 transition-colors cursor-pointer"
                >
                    保存
                </button>
                <button
                    onClick={cancelEdit}
                    className="bg-red-400 text-white px-4 py-2 rounded-xl outline-none hover:bg-red-500 transition-colors cursor-pointer"
                >
                    取消
                </button>
            </div>
        </>)
    } else {
        return (<>
            <p className="text-2xl font-bold underline mb-6 break-all border border-white">{title}</p>
            <span className="block w-full mb-6 border border-gray-300 p-2 rounded-xl whitespace-pre-wrap">{text}</span>
            <div className="flex justify-around">
                <button
                    onClick={startEdit}
                    className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition-colors cursor-pointer"
                >
                    編集
                </button>
                <button
                    onClick={() => deleteMemo(memo.id).then(() => router.push("/"))}
                    className="bg-red-400 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition-colors cursor-pointer"
                >
                    削除
                </button>
            </div>
        </>)
    }
}