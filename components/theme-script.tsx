// This component injects a script that prevents flash of wrong theme
export function ThemeScript() {
  const themeScript = `
    (function() {
      // Check for saved theme
      const theme = window.localStorage.getItem('theme') || 'system';
      
      // Apply the theme immediately to prevent flash
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const resolvedTheme = theme === 'system' ? systemTheme : theme;
      
      if (resolvedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      // Key attribute ensures the script runs on every navigation
      key="theme-script"
    />
  )
}
