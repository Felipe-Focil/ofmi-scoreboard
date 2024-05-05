import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import FullScreenButton from './components/FullScreenButton.jsx';
import ThemeToggleButton from './components/ThemeToggleButton.jsx';
import { lightTheme, darkTheme } from './utils/Themes.jsx';



const queryClient = new QueryClient();



function App(props) {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const currentTheme = darkMode ? darkTheme : lightTheme;

    return (
        <></>
    );
}

export default App;
