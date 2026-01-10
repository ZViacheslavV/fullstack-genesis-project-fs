"use client";

import React from "react";
import css from "./PageTitle.module.css";
import { useAuthUserStore } from "@/lib/store/authStore";

type BaseTitleProps = {
  children: React.ReactNode;
};

export function BasePageTitle({ children }: BaseTitleProps) {
  return <h1 className={css.title}>{children}</h1>;
}

type UserForTitle = {
  name?: string | null;
  email?: string | null;
};

function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) return "Доброго ранку";
  if (hour >= 12 && hour < 18) return "Доброго дня";
  if (hour >= 18 && hour < 23) return "Доброго вечора";

  return "Доброї ночі";
}

function PageTitle() {
  const user = useAuthUserStore((state) => state.user) as UserForTitle | null;

  const userName = user?.name || user?.email || "Гість";

  const greeting = `${getGreeting()}, ${userName}!`;

  return <BasePageTitle>{greeting}</BasePageTitle>;
}

export default PageTitle;