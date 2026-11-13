import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Info } from 'lucide-react';

interface ToastApi {
  notify: (message: string) => void;
}

const ToastContext = createContext<ToastApi>({ notify: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const notify = useCallback((m: string) => {
    setMessage(m);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 4200);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4"
      >
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl bg-navy px-5 py-3.5 text-sm leading-snug text-ivory shadow-[0_12px_32px_-12px_rgba(7,18,43,0.5)]"
            >
              <Info size={18} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
