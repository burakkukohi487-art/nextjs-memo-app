"use client";

import { useEffect, useState } from "react";
import { Memo } from "./types/memo"
import { addMemo, getMemos, deleteMemo } from "./lib/memoService";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";


export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);

  const load = async () => {
    const data = await getMemos();
    setMemos(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (text: string) => {
    await addMemo(text);
    await load();
  };

  const handleDelete = async (id: string) => {
    await deleteMemo(id);
    await load();
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-800">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">メモ</h1>
        <MemoForm onAdd={handleAdd} />
        <MemoList memos={memos} onDelete={handleDelete} />
      </div>
    </main>
  );
}