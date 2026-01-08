'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  if (typeof document === 'undefined') return null;

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!closeOnBackdrop) return;
    if (event.target === event.currentTarget) onClose();
  };

  const modal = (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={css.modal} role="dialog" aria-modal="true">
        {showCloseButton && (
          <button
            type="button"
            className={css.closeButton}
            onClick={onClose}
            aria-label="Закрити модалку"
          >
            <svg
              className={css.closeIcon}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href="/icons.svg#icon-close" />
            </svg>
          </button>
        )}

        <div className={css.content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default Modal;
