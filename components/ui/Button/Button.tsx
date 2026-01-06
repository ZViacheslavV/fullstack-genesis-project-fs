"use client";

import React from "react";
import css from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
  isLoading = false,
  onClick,
}) => {
  const isDisabled = disabled || isLoading;

  const className = [
    css.button,
    css[`variant-${variant}`],
    fullWidth ? css.fullWidth : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={className}
      onClick={onClick}
    >
      {isLoading ? "Зачекай..." : children}
    </button>
  );
};

