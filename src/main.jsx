import ReactDOM from "react-dom";
import "./index.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedContests from "./components/FeaturedContests.jsx";
import Contest from "./components/Contest.jsx";
import SplitContest from "./components/SplitContest.jsx";
import StackComponent from "./components/StackComponent.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import FullScreenButton from "./components/FullScreenButton.jsx";
import ThemeToggleButton from "./components/ThemeToggleButton.jsx";
import { lightTheme, darkTheme } from "./utils/Themes.jsx";

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={currentTheme}>
          <Toolbar>
            <div style={{ flexGrow: 1 }} />
            <ThemeToggleButton
              theme={currentTheme}
              toggleTheme={toggleDarkMode}
              isDarkMode={darkMode}
            />
            <FullScreenButton />
          </Toolbar>

          <Router>
            <Routes>
              <Route path="/ofmi-scoreboard/">
                <Route index element={<FeaturedContests />} />
                <Route path="featured" element={<FeaturedContests />} />
                <Route path="scoreboards" element={<SplitContest />} />
                <Route path="contest" element={<Contest />} />
                <Route path="contest/:id" element={<Contest />} />
                <Route
                  path="contest/admin/:id"
                  element={<Contest admin={true} />}
                />
                <Route path="merge" element={<StackComponent />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
