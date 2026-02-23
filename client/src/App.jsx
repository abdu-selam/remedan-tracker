import { useEffect, useState } from "react";
import api from "./config/api.config";
import useRefresh from "./hooks/useRefresh";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Validate from "./components/Validate";
import useStore from "./store/useStore";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const log = useStore(state=>state.user.log)
  const setLog = useStore(state=>state.setLog)
  const name = useStore((state)=>state.user.name)
  const setName = useStore(state=>state.setName)
  const setEmail = useStore(state=>state.setEmail)

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await useRefresh(() => api.get("/auth/me"));
        if (res) {
          setLog(true);
          setName(res.user.name)
          setEmail(res.user.email)
        }
      } catch (error) {
        setLog(false);
      }
    };

    fetcher();
  }, []);
  return (
    <>
      {!log ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/validate" element={<Validate />} />
        </Routes>
      ) : (
        <div>
          <Dashboard />
        </div>
      )}
    </>
  );
};

export default App;
