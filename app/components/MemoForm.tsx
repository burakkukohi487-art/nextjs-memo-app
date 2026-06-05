import { useState } from "react";

type Props = {
    onAdd: (title: string, text: string) => void;
}

export default function AddMemo({ onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleAdd = () => {
        if (!title) return;
        onAdd(title, text);
        setTitle("");
        setText("");
    };

    return (
        <div className="flex flex-col items-center mb-6 space-y-2">
            <input
                type="text"
                value={title}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトルを入力"
                className="px-4 py-2 border border-gray-300 rounded-xl outline-none w-sm focus:ring-1 focus:ring-blue-400 transition-shadow"
            />
            <textarea
                value={text}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAdd();
                    }
                }}
                onChange={(e) => setText(e.target.value)}
                placeholder="メモを入力"
                className="px-4 py-2 border border-gray-400 rounded-xl outline-none w-sm focus:ring-1 focus:ring-blue-400 transition-shadow h-40"
            />
            <button
                onClick={handleAdd}
                className="bg-blue-400 max-w-16 items-center text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-500 transition-colors"
            >
                追加
            </button>
        </div >
    )
}