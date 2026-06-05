"use client";

import { useState, useEffect } from "react";
import { Memo } from "../types/memo";
import { useRouter, useSearchParams } from "next/navigation";
import { getMemos } from "../lib/memoService";
import LoadingSpinner from "../components/loadingSpinner";
import EditText from "../components/EditText"

export default function DetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [memo, setMemo] = useState<Memo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getMemos(id).then((memos) => {
            setMemo(memos[0] ?? null);
            setLoading(false);
        });
    }, [id])

    return (
        <main className="min-h-screen bg-white flex items-center justify-center text-gray-800">
            <div className="mb-auto mt-20 shadow-md rounded-xl w-xl p-8">
                <button
                    onClick={() => router.push("/")}
                    className="bg-gray-200 rounded-xl px-4 py-2 mb-6
                    hover:bg-gray-300 transition-colors cursor-pointer"
                >
                    戻る
                </button>
                {loading
                    ? <LoadingSpinner />
                    : memo ? <EditText {...memo} />
                        : <p>メモが見つかりません</p>
                }
            </div>
        </main>
    )
}