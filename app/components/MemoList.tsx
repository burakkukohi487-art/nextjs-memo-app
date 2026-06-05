import { Memo } from "../types/memo";
import { useRouter } from "next/navigation";

type Props = {
    memos: Memo[];
    onDelete: (id: string) => void;
}

export default function MemoList({ memos, onDelete }: Props) {
    const router = useRouter();
    return (
        <ul className="space-y-2">
            {memos.map((memo) => (
                <li
                    key={memo.id}
                    onClick={() => router.push(`/detail?id=${memo.id}`)}
                    className="flex px-4 py-2 border border-gray-300 rounded-xl
                             cursor-pointer outline-none hover:ring-1 hover:ring-blue-400
                             transition-all"
                >
                    <span
                        className="max-w-[300px] truncate">{memo.title}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(memo.id);
                        }}
                        className="ml-auto bg-red-400 text-white px-2 rounded-xl
                        hover:bg-red-500 transition-colors cursor-pointer"
                    >
                        削除</button>
                </li>
            ))}
        </ul>
    )
}