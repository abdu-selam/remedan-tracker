import { useEffect, useState } from "react";
import api from "./config/api.config";
import useRefresh from "./hooks/useRefresh";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Validate from "./components/Validate";
import useStore from "./store/useStore";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import Loading from "./components/Loading";

const App = () => {
  const log = useStore((state) => state.user.log);
  const setLog = useStore((state) => state.setLog);
  const setName = useStore((state) => state.setName);
  const setEmail = useStore((state) => state.setEmail);
  const [load, setLoad] = useState(true);
  const setTodayProgress = useStore((state) => state.setTodayProgress);
  const setToday = useStore((state) => state.setToday);
  const setTotalProgress = useStore((state) => state.setTotalProgress);
  let timeout = null;

  useEffect(() => {
    const fetcher = async () => {
      if (log) return;
      try {
        const res = await useRefresh("/auth/me", 'get');
        if (res) {
          setLog(true);
          setName(res.user.name);
          setEmail(res.user.email);
          setTotalProgress(res.user.progress.total);
          setTodayProgress(res.user.progress.today);
          setToday(res.user.today);
        }
      } catch (error) {
        setLog(false);
      } finally {
        setLoad(false);
      }
    };

    fetcher();
  }, [log]);
  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div>
          {!log ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/validate" element={<Validate />} />
              <Route path="/reset" element={<ForgotPassword />} />
            </Routes>
          ) : (
            <div className="min-h-screen h-max pt-4 flex flex-col justify-between">
              <Dashboard />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
