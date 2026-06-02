import { useState } from "react";

type Props = {
    onAdd: (text: string) => void;
}

export default function AddMemo({ onAdd }: Props) {
    const [text, setText] = useState("");

    const handleAdd = () => {
        if (!text) return;
        onAdd(text);
        setText("");
    };

    return (
        <div className="flex gap-2 mb-6">
            <input
                type="text"
                value={text}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                onChange={(e) => setText(e.target.value)}
                placeholder="メモを入力"
            />
            <button
                onClick={handleAdd}
            >
                追加
            </button>
        </div >
    )
}