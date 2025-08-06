import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocale = (): "tr" | "en" => {
  const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const firstSegment = cleanPath.split("/")[0];
  return firstSegment === "tr" ? "tr" : "en";
};
