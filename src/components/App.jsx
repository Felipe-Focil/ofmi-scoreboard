import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Contest from './Contest.jsx';
import SplitContest from './SplitContest.jsx';
import StackComponent from './StackComponent.jsx';
import FullScreenButton from './FullScreenButton.jsx';
import ThemeToggleButton from './ThemeToggleButton';
import { lightTheme, darkTheme } from '../utils/Themes.jsx';
import FeaturedContests from './FeaturedContests.jsx';

const queryClient = new QueryClient();

function App() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const currentTheme = darkMode ? darkTheme : lightTheme;

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={currentTheme}>
                <Router basename={"/ofmi-scoreboard/"}>
                    <Toolbar>
                        <div style={{ flexGrow: 1 }} />
                        <ThemeToggleButton theme={currentTheme} toggleTheme={toggleDarkMode} isDarkMode={darkMode} />
                        <FullScreenButton />
                    </Toolbar>

                    <div>
                        <Routes>
                            <Route path="/" element={<FeaturedContests />} />
                            <Route path="/scoreboards" element={<SplitContest />} />
                            <Route path="/contest" element={<Contest />} />
                            <Route path="/contest/:id" element={<Contest />} />
                            <Route path="/contest/admin/:id" element={<Contest admin={true} />} />
                            <Route path="/merge" element={<StackComponent />} />
                        </Routes>
                    </div>
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
