interface LoadingStateProps {
  status: string;
}

export default function LoadingState({ status }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      {/* Status text */}
      <p className="text-gray-600 text-center">{status}</p>
    </div>
  );
}
