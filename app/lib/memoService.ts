import { ref, push, get, remove, update, serverTimestamp, query, orderByChild } from "firebase/database";
import { db } from "./firebase"
import { Memo } from "../types/memo"

// メモ追加
export async function addMemo(title: string, text: string): Promise<Memo> {
    const memosRef = ref(db, "memos");
    const trimedText = text.trimEnd()
    const trimedTitle = title.trimEnd()
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

// メモ編集
export async function updateMemo(id: string, title: string, text: string): Promise<void> {
    const memoRef = ref(db, `memos/${id}`);
    await update(memoRef, {
        title: title.trimEnd(),
        text: text.trimEnd(),
    });
}