const ErrorMessage = ({ error }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-red-100 p-4 rounded-lg max-w-md">
        <h2 className="text-red-600 text-xl font-semibold mb-2">Error!</h2>
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
