// In App.js
import { Outlet } from 'react-router-dom';
import { useTheme } from './Contexts/ThemeContext';
import './App.css';

function App() {
  const { isDark } = useTheme();
  
  return (
    <div className={`app-container ${isDark ? 'dark' : ''}`}>
      <Outlet />
    </div>
  );
}

export default App;