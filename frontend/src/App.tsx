import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import SearchPage from "./pages/SearchPage";
import CityDetailsPage from "./pages/CityDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import Compare from "./pages/Compare";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import LanguageProvider from "./context/LanguageContext";


function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/app/dashboard" element={<DashboardPage />} />
            <Route path="/app/search" element={<SearchPage />} />
            <Route path="/app/city/:id" element={<CityDetailsPage />} />
            <Route path="/app/favorites" element={<FavoritesPage />} />
            <Route path="/app/compare" element={<Compare />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
