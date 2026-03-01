import { useEffect, useRef, useState } from "react";
import api from "../config/api.config";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Validate = () => {
  const tokenRef = useRef();
  const [resend, setResend] = useState("0:59");
  const [canSend, setCansend] = useState(false);
  const email = useStore((state) => state.user.email);
  const setName = useStore((state) => state.setName);
  const setEmail = useStore((state) => state.setEmail);
  const navigate = useNavigate();
  const log = useStore((state) => state.user.log);
  const setLog = useStore((state) => state.setLog);
  const [alert, setAlert] = useState(false);
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState("");
  const error = useStore((state) => state.user.alert);
  const setError = useStore((state) => state.setAlert);
  let timeout = null;

  const counter = () => {
    let num = 59;

    const timer = setInterval(() => {
      if (num == 0) {
        setResend("Resend");
        clearInterval(timer);
      } else {
        num--;
        setResend(num > 9 ? `0:${num}` : `0:0${num}`);
      }
    }, 1000);
  };

  const resendController = async () => {
    if (resend.toLowerCase() != "resend") {
      return;
    }

    try {
      const res = await api.post("/auth/resend", { email });
      setError(false);
    } catch (error) {
      navigate("/", { replace: true });
      setError(true);
    } finally {
      setCansend(!canSend);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (log) {
      navigate("/", { replace: true });
    }
    const message = !error
      ? "Email Sent Successfully. If you don't get the email check your spam"
      : "Sorry today's limit reached. Try tomorow";
    if (msg == message) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    setAlert(true);
    setMsg(message);
    setType(!error);
    timeout = setTimeout(() => {
      setAlert(false);
      setMsg("");
      timeout = null;
    }, 5000);

    counter();
  }, [canSend]);

  const submitter = async () => {
    const form = tokenRef.current;

    let token = "";
    for (let i = 0; i < 6; i++) {
      const input = form[`token-${i}`].value;
      token += input;
    }

    if (token.length !== 6) {
      return;
    }

    try {
      const res = await api.post("/auth/verify", { token });
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      setLog(true);
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response.data.message == "Invalid Token") {
        const message = "Please check the code and fill correctly!";
        if (msg == message) {
          return;
        }

        if (timeout) {
          clearTimeout(timeout);
        }
        setAlert(true);
        setMsg(message);
        timeout = setTimeout(() => {
          setAlert(false);
          setMsg("");
          timeout = null;
        }, 5000);
      } else if (error.response.data.message == "Expired Token") {
        const message = "Token has been expired please click resend for new token!";
        if (msg == message) {
          return;
        }

        if (timeout) {
          clearTimeout(timeout);
        }
        setAlert(true);
        setMsg(message);
        timeout = setTimeout(() => {
          setAlert(false);
          setMsg("");
          timeout = null;
        }, 5000);
      }
    }
  };

  const nextInput = (e) => {
    e.preventDefault();

    const curr = e.target;
    const next = e.target.nextSibling;
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (numbers.includes(curr.value)) {
      curr.setAttribute("readonly", "true");
      if (next) {
        curr.style.borderColor = "green";
        next.removeAttribute("readonly");
        next.focus();
      } else {
        curr.style.borderColor = "green";
        submitter();
      }
    } else {
      curr.value = "";
    }
  };

  const backFunc = (e) => {
    const curr = e.target;
    const pre = e.target.previousSibling;

    if (pre) {
      if (e.key == "Backspace") {
        pre.value = "";
        curr.value = "";
        curr.style.borderColor = "color-mix(in oklab, black 50%, transparent)";
        pre.style.borderColor = "color-mix(in oklab, black 50%, transparent)";

        curr.setAttribute("readonly", "true");
        pre.removeAttribute("readonly");
        pre.focus();
      }
    }
  };

  return (
    <div className="h-screen grid place-content-center">
      <Alert msg={msg} type={type} on={alert} />
      <div className="flex flex-col gap-4 items-center animate-auth">
        <form
          onSubmit={nextInput}
          ref={tokenRef}
          className="flex gap-1 border w-max p-8 rounded-md "
        >
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <input
              onInput={nextInput}
              onKeyDown={backFunc}
              className={`border border-second/50 text-xl p-2 w-8 h-12 rounded-lg focus:outline-none animate-opp`}
              type="text"
              readOnly={i != 0}
              max={1}
              key={i}
              name={`token-${i}`}
              autoComplete="off"
            />
          ))}
        </form>
        <p className="text-sm flex gap-1 animate-down">
          Dosen't Recieve Verification code?
          <span
            onClick={resendController}
            className={`${resend.toLowerCase() == "resend" ? "text-confirm" : "text-second/70"} `}
          >
            {resend}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Validate;
