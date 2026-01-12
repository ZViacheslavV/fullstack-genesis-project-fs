"use client";

import type { DiaryEntry } from "@/types/diary";
import AddDiaryEntryForm from "./addDiaryEntryForm";

type AddDiaryEntryFormProps = {
  onSuccess: () => void;
  initialValues?: Partial<DiaryEntry>;
  mode?: "create" | "edit";
};

export default function AddDiaryEntryFormWrapper(props: AddDiaryEntryFormProps) {
  return <AddDiaryEntryForm {...props} />;
}