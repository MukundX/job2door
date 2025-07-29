export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50" style={{ display: 'none' }} id="global-loading-spinner">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
} 