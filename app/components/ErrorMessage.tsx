type Props = {
    message: string;
};

export default function Errormessage({ message }: Props) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {message}
        </div>
    );
}