import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border flex items-center gap-3 backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-neutral-900/95 border-amber-500/40 text-white shadow-amber-950/20'
                : isError
                ? 'bg-rose-950/95 border-rose-600 text-white shadow-rose-950/20'
                : 'bg-neutral-900/95 border-neutral-700 text-neutral-200'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
            {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-neutral-400 shrink-0" />}

            <span className="text-xs font-medium leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
