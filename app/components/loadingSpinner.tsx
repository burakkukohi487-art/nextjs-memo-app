export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-4 border-blue-400 border-t-transparent" />
        </div>
    );
}