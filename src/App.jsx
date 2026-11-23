import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import MobileNav from "./components/layout/MobileNav";

function App() {
  return (
      <BrowserRouter>
  <div className="min-h-screen bg-slate-50">
    <MobileNav />

    <Sidebar />

    <div className="lg:pl-64">
      <Header />

          <main className="p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;