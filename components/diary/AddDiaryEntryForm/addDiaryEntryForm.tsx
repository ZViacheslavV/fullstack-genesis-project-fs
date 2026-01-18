"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useMemo } from "react";
import styles from "./AddDiaryEntryForm.module.css";
import Button from "@/components/common/Button/Button";

import { useDiaryStore } from "@/lib/store/diaryStore";
import MultiSelect from "./MultiSelect";

type EmotionLike = string | { _id: string; title?: string };

type AddDiaryEntryFormProps = {
  onSuccess: () => void;
  initialValues?: {
    _id?: string;
    title?: string;
    description?: string;
    emotions?: EmotionLike[];
    date?: string;
  };
  mode?: "create" | "edit";
};

type FormValues = {
  title: string;
  description: string;
  emotions: string[];
};

const MAX_EMOTIONS = 12;
const MAX_CHARS = 1000; 

const schema: Yup.ObjectSchema<FormValues> = Yup.object({
  title: Yup.string().trim().min(1, "Мінімум 1 символ").max(64, "Максимум 64 символи").required("Вкажи заголовок"),
  description: Yup.string()
    .trim()
    .min(1, "Мінімум 1 символ")
    .max(MAX_CHARS, `Максимум ${MAX_CHARS} символів`)
    .required("Напиши текст запису"),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, "Обери хоча б одну емоцію")
    .max(MAX_EMOTIONS, `Максимум ${MAX_EMOTIONS} емоцій`)
    .required(),
});

function normalizeEmotionIds(emotions?: (string | { _id: string })[]): string[] {
  if (!Array.isArray(emotions)) return [];
  return emotions
    .map((e) => (typeof e === "string" ? e : e?._id))
    .filter((id): id is string => typeof id === "string" && id.length > 0);
}

function getErrorMessage(e: unknown, fallback: string) {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data;
    if (data && typeof data === 'object' && 'message' in data) {
      return (data as { message: string }).message;
    }
    return e.message || fallback;
  }
  if (e instanceof Error) return e.message || fallback;
  return fallback;
}

export default function AddDiaryEntryForm({
  onSuccess,
  initialValues,
  mode = "create",
}: AddDiaryEntryFormProps) {
  const entryId = initialValues?._id;
  
  const { addEntry, editEntry, emotions, fetchEmotions } = useDiaryStore();

  useEffect(() => {
    fetchEmotions();
  }, [fetchEmotions]);

  const defaults: FormValues = useMemo(
    () => ({
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      emotions: normalizeEmotionIds(initialValues?.emotions),
    }),
    [initialValues]
  );

  return (
    <div className={styles.formWrap}>
      <Formik<FormValues>
        initialValues={defaults}
        validationSchema={schema}
        enableReinitialize
        validateOnBlur
        validateOnChange={true}
        onSubmit={async (values, helpers) => {
          try {
            const payload = {
              title: values.title.trim(),
              note: values.description.trim(),
              emotions: values.emotions,
            };

            if (mode === "edit") {
              if (!entryId) throw new Error("Не знайдено id запису");
              await editEntry(entryId, payload);
            } else {
              await addEntry(payload);
            }

            onSuccess();
          } catch (e: unknown) {
            helpers.setSubmitting(false);
            toast.error(getErrorMessage(e, "Не вдалося зберегти запис."));
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form className={styles.form}>
            {/* --- ЗАГОЛОВОК --- */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="title">
                Заголовок
                <span className={styles.star}>*</span>
              </label>
              <Field 
                id="title" 
                name="title" 
                className={`${styles.input} ${errors.title && touched.title ? styles.errorInput : ''}`}
                placeholder="Введіть заголовок запису" 
                autoComplete="off" 
              />
              <ErrorMessage name="title" component="p" className={styles.error} />
            </div>

            {/* --- КАТЕГОРІЇ --- */}
            <div className={styles.field}>
              <p className={styles.label}>
                Категорії
                <span className={styles.star}>*</span>
              </p>
              <div className={errors.emotions && touched.emotions ? styles.errorInput : ''} style={{ borderRadius: '12px' }}>
                <MultiSelect
                  placeholder={emotions.length === 0 ? "Завантаження..." : "Оберіть категорію"}
                  options={emotions}
                  value={values.emotions}
                  disabled={emotions.length === 0}
                  onChange={(next) => {
                    if (next.length > MAX_EMOTIONS) {
                      toast.error(`Можна обрати максимум ${MAX_EMOTIONS} емоцій`);
                      return;
                    }
                    setFieldValue("emotions", next);
                  }}
                />
              </div>
              <ErrorMessage name="emotions" component="p" className={styles.error} />
            </div>

            {/* --- ЗАПИС --- */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">
                Запис
                <span className={styles.star}>*</span>
              </label>
              
              <div className={styles.textareaWrapper}>
                <Field 
                  as="textarea" 
                  id="description" 
                  name="description" 
                  className={`${styles.textarea} ${errors.description && touched.description ? styles.errorInput : ''}`}
                  placeholder="Запишіть, як ви себе відчуваєте" 
                  rows={6}
                  maxLength={MAX_CHARS}
                />
                
                <div className={styles.charCounter}>
                  {values.description.length} / {MAX_CHARS}
                </div>
              </div>

              <ErrorMessage name="description" component="p" className={styles.error} />
            </div>

            <Button
              type="submit"
              size="md"
              variant="normal"
              isLoading={isSubmitting}
              loadingText="Збереження…"
              disabled={emotions.length === 0}
              className={styles.saveBtn}
            >
              Зберегти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}