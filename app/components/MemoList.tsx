import { Memo } from "../types/memo";

type Props = {
    memos: Memo[];
    onDelete: (id: string) => void;
}

export default function MemoList({ memos, onDelete }: Props) {
    return (
        <ul className="space-y-2">
            {memos.map((memo) => (
                <li key={memo.id}>
                    <span>{memo.text}</span>
                    <button onClick={() => onDelete(memo.id)}>削除</button>
                </li>
            ))}
        </ul>
    )
}