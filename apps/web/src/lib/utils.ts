import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkFileType(file: File | undefined) {
  if (!file) return false;

  if (file.name) {
    const fileType = file.name.split('.').pop();
    if (fileType === 'docx' || fileType === 'pdf' || fileType === 'doc')
      return true;
  }

  return false;
}

export function getFileType(file: File | undefined): string | undefined {
  if (!file?.name) return undefined;

  return file.name.split('.').pop();
}

export function convertDate(dateString: string) {
  const date = new Date(dateString);
  return new Date(date.getTime() + 7 * 60 * 60 * 1000).toLocaleString('th-TH', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}

export function isUUID(uuid: string) {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(uuid);
}
