import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkFileType(file: File | undefined) {
  if (!file) return false

  if (file.name) {
    const fileType = file.name.split(".").pop()
    if (fileType === "docx" || fileType === "pdf" || fileType === "doc") return true
  }

  return false
}
