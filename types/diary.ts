export type DiaryEntry = {
  _id: string;
  title: string;
  note: string;
  emotions: string[];
  createdAt: string;
  updatedAt: string;
};

export type DiariesApiResponse =
  | DiaryEntry[]
  | { data: DiaryEntry[] };

export function isWrappedDiariesResponse(
  value: unknown
): value is { data: DiaryEntry[] } {
  if (typeof value !== 'object' || value === null) return false;
  if (!('data' in value)) return false;

  const data = (value as { data: unknown }).data;
  return Array.isArray(data);
}
