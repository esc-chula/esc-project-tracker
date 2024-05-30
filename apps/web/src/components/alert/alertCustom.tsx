import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

export default function AlertCustom({
  isError,
  message,
}: {
  isError: boolean;
  message: string;
}) {
  const [open, setOpen] = useState(true);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideOut(true);
    }, 2700);

    const closeTimer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, []);

  if (!open) return null;

  return (
    <Alert
      severity={isError ? "error" : "success"}
      className={`fixed bottom-7 right-7 z-50 w-[30vw] h-[10vh] ${
        isError ? "border-red" : "border-green-600 "
      } border-2 opacity-60 flex items-center ${
        slideOut ? "animate-slideOut" : "animate-slideIn"
      }`}
    >
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        {message}
      </div>
    </Alert>
  );
}
