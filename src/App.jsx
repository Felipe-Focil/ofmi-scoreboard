import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Contest from './components/Contest.jsx';
import SplitContest from './components/SplitContest.jsx';
import StackComponent from './components/StackComponent.jsx';
import FullScreenButton from './components/FullScreenButton.jsx';
import ThemeToggleButton from './components/ThemeToggleButton.jsx';
import { lightTheme, darkTheme } from './utils/Themes.jsx';
import FeaturedContests from './components/FeaturedContests.jsx';

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
                <Router>
                    <Toolbar>
                        <div style={{ flexGrow: 1 }} />
                        <ThemeToggleButton theme={currentTheme} toggleTheme={toggleDarkMode} isDarkMode={darkMode} />
                        <FullScreenButton />
                    </Toolbar>

                    <div>
                        <Routes>
                            <Route path="/ofmi-scoreboard" element={<FeaturedContests />} />
                            <Route path="/ofmi-scoreboard/scoreboards" element={<SplitContest />} />
                            <Route path="/ofmi-scoreboard/contest" element={<Contest />} />
                            <Route path="/ofmi-scoreboard/contest/:id" element={<Contest />} />
                            <Route path="/ofmi-scoreboard/contest/admin/:id" element={<Contest admin={true} />} />
                            <Route path="/ofmi-scoreboard/merge" element={<StackComponent />} />
                        </Routes>
                    </div>
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
