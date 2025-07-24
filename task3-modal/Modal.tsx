import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

// Задача 3: Modal компонент
// Найдите и исправьте все ошибки в этом компоненте

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  closable?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closable = true,
  closeOnOverlayClick = true,
  closeOnEsc = true
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ошибка 1: неправильная обработка ESC без проверки isOpen
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closeOnEsc, onClose]);

  // Ошибка 2: отсутствует управление фокусом
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Ошибка 3: нет блокировки scroll у body
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Ошибка 4: некорректная проверка клика по overlay
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Ошибка 5: отсутствует preventDefault для предотвращения всплытия
    event.stopPropagation();
  };

  // Ошибка 6: отсутствует проверка существования portal target
  const portalTarget = document.getElementById('modal-root');

  if (!isOpen && !isAnimating) {
    return null;
  }

  const modalContent = (
    <div 
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={handleOverlayClick}
      // Ошибка 7: отсутствуют aria атрибуты для accessibility
    >
      <div 
        ref={modalRef}
        className={`${styles.modal} ${styles[size]} ${isOpen ? styles.open : ''}`}
        onClick={handleModalClick}
        // Ошибка 8: отсутствуют role и aria-labelledby
      >
        {/* Ошибка 9: заголовок отображается даже когда title не передан */}
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          
          {/* Ошибка 10: кнопка закрытия отображается даже когда closable=false */}
          <button 
            className={styles.closeButton}
            onClick={onClose}
            // Ошибка 11: отсутствует aria-label
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          {children}
        </div>

        {/* Ошибка 12: footer отображается всегда, даже когда нет actions */}
        <div className={styles.footer}>
          <button 
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className={styles.confirmButton}
            // Ошибка 13: отсутствует обработчик для confirm
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  // Ошибка 14: отсутствует fallback если portalTarget не существует
  return ReactDOM.createPortal(modalContent, portalTarget);
};

export default Modal;

// Ошибка 15: отсутствует компонент-обертка для создания portal target
// Должен быть отдельный ModalProvider или инструкции по добавлению div#modal-root