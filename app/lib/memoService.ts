import { collection, doc, addDoc, getDocs, deleteDoc, serverTimestamp, orderBy, query } from "firebase/firestore"
import { db } from "./firebase"
import { Memo } from "../types/memo"

// メモ追加
export async function addMemo(text: string) {
    await addDoc(collection(db, "memos"), {
        text,
        createdAt: serverTimestamp(),
    });
}

// メモ全件取得
export async function getMemos(): Promise<Memo[]> {
    const q = query(collection(db, "memos"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt?.toDate(),
    }));
}

// メモ削除
export async function deleteMemo(id: string) {
    await deleteDoc(doc(db, "memos", id));
}