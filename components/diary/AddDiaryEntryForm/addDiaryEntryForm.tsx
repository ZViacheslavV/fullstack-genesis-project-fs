"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styles from "./AddDiaryEntryForm.module.css";
import Button from "../../common/Button/Button";

import MultiSelect, { type EmotionDTO } from "./MultiSelect";

type AddDiaryEntryFormProps = {
  onSuccess: () => void;
  initialValues?: {
    _id?: string;
    title?: string;
    description?: string;
    emotions?: string[];
    date?: string;
  };
  mode?: "create" | "edit";
};

type FormValues = {
  title: string;
  description: string;
  emotions: string[];
};

type EmotionsApiResponse = {
  status: number;
  message: string;
  data: EmotionDTO[];
};

const schema: Yup.ObjectSchema<FormValues> = Yup.object({
  title: Yup.string().trim().min(1, "Мінімум 1 символ").max(64, "Максимум 64 символи").required("Вкажи заголовок"),
  description: Yup.string()
    .trim()
    .min(1, "Мінімум 1 символ")
    .max(1000, "Максимум 1000 символів")
    .required("Напиши текст запису"),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, "Обери хоча б одну емоцію")
    .max(12, "Максимум 12 емоцій")
    .required(),
});

function hasMessage(value: unknown): value is { message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof (value as { message?: unknown }).message === "string"
  );
}

function getErrorMessage(e: unknown, fallback: string) {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data;
    if (hasMessage(data)) return data.message;
    return e.message || fallback;
  }
  if (e instanceof Error) return e.message || fallback;
  return fallback;
}

function useEmotions() {
  const [emotions, setEmotions] = useState<EmotionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const res = await axios.get<EmotionsApiResponse>("/api/emotions", { withCredentials: true });
        if (!alive) return;
        setEmotions(res.data.data ?? []);
      } catch (e: unknown) {
        if (!alive) return;
        toast.error(getErrorMessage(e, "Не вдалося завантажити список емоцій."));
        setEmotions([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { emotions, loading };
}

export default function AddDiaryEntryForm({
  onSuccess,
  initialValues,
  mode = "create",
}: AddDiaryEntryFormProps) {
  const entryId = initialValues?._id;
  const { emotions, loading: loadingEmotions  } = useEmotions();

  const defaults: FormValues = useMemo(
    () => ({
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      emotions: initialValues?.emotions ?? [],
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
        validateOnChange={false}
        onSubmit={async (values, helpers) => {
          try {
            const payload = {
              title: values.title.trim(),
              description: values.description.trim(),
              emotions: values.emotions,
            };

            if (mode === "edit") {
              if (!entryId) throw new Error("Не знайдено id запису для редагування");
              await axios.patch(`/api/diaries/${entryId}`, payload, { withCredentials: true });
            } else {
              await axios.post(`/api/diaries`, payload, { withCredentials: true });
            }

            onSuccess();
          } catch (e: unknown) {
            helpers.setSubmitting(false);
            toast.error(getErrorMessage(e, "Не вдалося зберегти запис. Спробуй ще раз."));
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="title">
                Заголовок
              </label>
              <Field id="title" name="title" className={styles.input} placeholder="Введіть заголовок запису" autoComplete="off" />
              <ErrorMessage name="title" component="p" className={styles.error} />
            </div>

            <div className={styles.field}>
              <p className={styles.label}>Категорії</p>
              <MultiSelect
                placeholder={loadingEmotions ? "Завантаження..." : "Оберіть категорію"}
                options={emotions}
                value={values.emotions}
                disabled={loadingEmotions || emotions.length === 0}
                onChange={(next) => setFieldValue("emotions", next)}
              />
              <ErrorMessage name="emotions" component="p" className={styles.error} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">
                Запис
              </label>
              <Field as="textarea" id="description" name="description" className={styles.textarea} placeholder="Запишіть, як ви себе відчуваєте" rows={6} />
              <ErrorMessage name="description" component="p" className={styles.error} />
            </div>

            <Button
  type="submit"
  size="md"
  variant="normal"
  isLoading={isSubmitting}
  loadingText="Збереження…"
  disabled={loadingEmotions}
  className={styles.saveBtn}
>Зберегти</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}