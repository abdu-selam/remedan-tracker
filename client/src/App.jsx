import { useEffect, useState } from "react";
import useRefresh from "./hooks/useRefresh";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Validate from "./components/Validate";
import useStore, { useLocalStore } from "./store/useStore";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import Loading from "./components/Loading";
import Initial from "./pages/Initial";

const App = () => {
  const log = useStore((state) => state.user.log);
  const setLog = useStore((state) => state.setLog);
  const setName = useStore((state) => state.setName);
  const setEmail = useStore((state) => state.setEmail);
  const setUpdated = useLocalStore((state) => state.setUpdated);
  const setInitiated = useStore((state) => state.setInitiated);
  const [load, setLoad] = useState(true);
  const setTodayProgress = useStore((state) => state.setTodayProgress);
  const setToday = useStore((state) => state.setToday);
  const setTotalProgress = useStore((state) => state.setTotalProgress);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetcher = async () => {
      if (log) return;
      try {
        const res = await useRefresh("/auth/me", "get");
        if (res) {
          setLog(true);
          setName(res.user.name);
          setEmail(res.user.email);
          setTotalProgress(res.user.progress.total);
          setTodayProgress(res.user.progress.today);
          setToday(res.user.today);
          setInitiated(res.user.initiated);
          setUpdated(res.user.updated)

          if (!["/quran", "/terawih", "/zhikr"].includes(location.pathname)) {
            navigate("/quran", { replace: true });
          } else {
            navigate(location.pathname);
          }
        }
      } catch (error) {
        setLog(false);
        navigate("/", { replace: true });
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
        <div className="bg-primary text-second">
          {!log ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/validate" element={<Validate />} />
              <Route path="/reset" element={<ForgotPassword />} />
              <Route path="*" element={<Home />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/initiate" element={<Initial />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          )}
        </div>
      )}
    </>
  );
};

export default App;
