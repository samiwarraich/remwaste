interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-600 text-lg font-medium mb-2">
          Something went wrong
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Error;
