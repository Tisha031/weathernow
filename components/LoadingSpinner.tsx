export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center py-12">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
