import { Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes></Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
