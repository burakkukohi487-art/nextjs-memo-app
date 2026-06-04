import { ref, push, get, remove, serverTimestamp, query, orderByChild } from "firebase/database";
import { db } from "./firebase"
import { Memo } from "../types/memo"

// メモ追加
export async function addMemo(title: string, text: string): Promise<Memo> {
    const memosRef = ref(db, "memos");
    const trimedText = text.trim()
    const trimedTitle = title.trim()
    const newRef = await push(memosRef, {
        title: trimedTitle,
        text: trimedText,
        createdAt: serverTimestamp(),
    });

    return {
        id: newRef.key!,
        title: trimedTitle,
        text: trimedText,
        createdAt: new Date(),
    };
}

// メモ取得
export async function getMemos(id?: string): Promise<Memo[]> {
    const q = query(ref(db, "memos"), orderByChild("createdAt"));

    if (id) {
        const snapshot = await get(ref(db, `memos/${id}`))
        if (!snapshot.exists()) return [];
        return [{
            id: snapshot.key!,
            title: snapshot.val().title,
            text: snapshot.val().text,
            createdAt: snapshot.val().createdAt,
        }]
    }

    const snapshot = await get(q);
    if (!snapshot.exists()) return [];
    const memos: Memo[] = [];
    snapshot.forEach((child) => {
        memos.push({
            id: child.key!,
            title: child.val().title,
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