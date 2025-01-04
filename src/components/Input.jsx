export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
        disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
        ${className}`}
      {...props}
    />
  );
};