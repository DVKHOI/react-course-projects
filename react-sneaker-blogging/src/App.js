import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import ResgiterPage from "./pages/ResgiterPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/resgiter" element={<ResgiterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
