import { useState, useEffect } from 'react';
import { FaMoon, FaRegSun } from 'react-icons/fa';

export default function DarkLightToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark',
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className='text-center'>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className='flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-200 border border-gray-400 dark:bg-gray-700  dark:border-black hover:scale-103 transition-transform'
      >
        {darkMode ? <FaRegSun /> : <FaMoon />}
        {darkMode ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}
