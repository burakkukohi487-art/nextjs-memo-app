import { Memo } from "../types/memo";

type Props = {
    memos: Memo[];
    onDelete: (id: string) => void;
}

export default function MemoList({ memos, onDelete }: Props) {
    return (
        <ul className="space-y-2">
            {memos.map((memo) => (
                <li
                    key={memo.id}
                    className="flex px-4 py-2 border border-gray-400 rounded-lg
                             cursor-pointer"
                >
                    <a
                        href={`/detail?id=${memo.id}`}
                        className="max-w-[300px] truncate">{memo.title}
                    </a>
                    <button
                        onClick={() => onDelete(memo.id)}
                        className="ml-auto bg-red-500 text-white px-2 rounded-lg cursor-pointer"
                    >
                        削除</button>
                </li>
            ))}
        </ul>
    )
}