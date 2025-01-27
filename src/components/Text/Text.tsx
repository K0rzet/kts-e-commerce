import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import * as styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'semiBold' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const truncateText = (element: HTMLElement, maxLines: number) => {
  const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
  const maxHeight = lineHeight * maxLines;

  if (element.scrollHeight <= maxHeight) return;

  const originalText = element.textContent || '';
  const content = originalText;
  let start = 0;
  let end = content.length;

  while (start < end) {
    const mid = Math.floor((start + end + 1) / 2);
    element.textContent = content.slice(0, mid) + '...';

    if (element.scrollHeight <= maxHeight) {
      start = mid;
    } else {
      end = mid - 1;
    }
  }

  element.textContent = content.slice(0, start) + '...';
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  const Tag = tag;
  const visibleRef = useRef<HTMLElement>(null);
  const commonClassNames = classNames(
    styles.text,
    view && styles[`text_view_${view}`],
    tag !== 'p' && styles[`text_tag_${tag}`],
    weight && styles[`text_weight_${weight}`],
    color && styles[`text_color_${color}`],
    maxLines && styles.text_hasMaxLines,
    className
  );

  useEffect(() => {
    if (maxLines && visibleRef.current) {
      truncateText(visibleRef.current, maxLines);
    }
  }, [maxLines, children]);

  if (!maxLines) {
    return (
      <Tag
        data-testid="text"
        className={commonClassNames}
      >
        {children}
      </Tag>
    );
  }

  return (
    <>
      <Tag
        data-testid="text"
        className={commonClassNames}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      >
        {children}
      </Tag>
      <Tag
        ref={visibleRef as React.RefObject<HTMLDivElement>}
        aria-hidden="true"
        className={commonClassNames}
      >
        {children}
      </Tag>
    </>
  );
};

export default Text;
