'use client';

import { useEffect, useState } from 'react';

export type Theme = 'neutral' | 'girl' | 'boy';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('neutral');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      //   setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const changeTheme = (next: Theme) => {
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return { theme, changeTheme };
};

//Script to head rootlayout:
/*       <head>
        <script>
          {`
            // Логіка зміни теми
            (function() {
              const theme = localStorage.getItem('theme') || 'neutral';
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `}
        </script>
      </head> */
