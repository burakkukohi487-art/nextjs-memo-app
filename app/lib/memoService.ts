import { ref, push, get, remove, serverTimestamp, query, orderByChild } from "firebase/database";
import { db } from "./firebase"
import { Memo } from "../types/memo"

// メモ追加
export async function addMemo(text: string): Promise<Memo> {
    const memosRef = ref(db, "memos");
    const newRef = await push(memosRef, {
        text,
        createdAt: serverTimestamp(),
    });

    return {
        id: newRef.key!,
        text,
        createdAt: new Date(),
    };
}

// メモ全件取得
export async function getMemos(): Promise<Memo[]> {
    const q = query(ref(db, "memos"), orderByChild("createdAt"));
    const snapshot = await get(q);
    if (!snapshot.exists()) return [];

    const memos: Memo[] = [];
    snapshot.forEach((child) => {
        memos.push({
            id: child.key!,
            text: child.val().text,
            createdAt: new Date(child.val().createdAt),
        });
    });

    return memos.reverse()
}

// メモ削除
export async function deleteMemo(id: string) {
    await remove(ref(db, `memos/${id}`));
}