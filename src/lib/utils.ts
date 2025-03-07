import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildNyTimesQuery(
  category: string | null,
  beginDate?: string,
  endDate?: string
) {
  const queryObj: Record<string, string> = {};
  if (beginDate) {
    queryObj.begin_date = beginDate;
  }
  if (endDate) {
    queryObj.end_date = endDate;
  }
  if (category) {
    queryObj.fq = `section_name:("${category}")`;
  }

  return queryObj;
}
