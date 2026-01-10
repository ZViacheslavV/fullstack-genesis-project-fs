'use client';

import { useTheme } from '@/hooks/useTheme';

export const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        onClick={() => changeTheme('neutral')}
        aria-pressed={theme === 'neutral'}
      >
        Neutral
      </button>

      <button
        onClick={() => changeTheme('girl')}
        aria-pressed={theme === 'girl'}
      >
        Girl
      </button>

      <button onClick={() => changeTheme('boy')} aria-pressed={theme === 'boy'}>
        Boy
      </button>
    </div>
  );
};
