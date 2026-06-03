"use client";

import { useEffect, useState } from "react";
import { Memo } from "./types/memo"
import { addMemo, getMemos, deleteMemo } from "./lib/memoService";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import Errormessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/loadingSpinner";


export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true)
    try {
      const data = await getMemos();
      setMemos(data);
    } catch(e) {
      setError(`データ取得に失敗しました。\n${e}`);
    }
    setLoading(false)
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
      <div className="mb-auto mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">メモ</h1>
        {error && <Errormessage message={error} />}
        <MemoForm onAdd={handleAdd} />
        {loading && <LoadingSpinner />}
        <MemoList memos={memos} onDelete={handleDelete} />
      </div>
    </main>
  );
}