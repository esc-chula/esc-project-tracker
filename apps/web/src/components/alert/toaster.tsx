"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/src/components/ui/toast";
import { useToast } from "@/src/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({
        id,
        title,
        description,
        action,
        isError,
        ...props
      }) => {
        return (
          <Toast
            key={id}
            {...props}
            className={`${isError ? "bg-pink border-red" : "bg-green-200 border-green-700"} opacity-85 border-2 font-sukhumvit`}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
