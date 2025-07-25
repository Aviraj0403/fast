import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx, then merges Tailwind classes to avoid conflicts.
 * 
 * @param inputs - array of class values (strings, objects, arrays, etc.)
 * @returns merged and deduped class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
