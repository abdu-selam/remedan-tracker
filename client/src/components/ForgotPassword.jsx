import { useRef, useState } from "react";
import logo from "../assets/logo.png";
import {
  Eye,
  EyeClosed,
  LockIcon,
  Mail,
  ShieldCheck,
  Loader,
} from "lucide-react";
import Button from "./Button";
import api from "../config/api.config";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const ForgotPassword = () => {
  const forgotRef = useRef();
  const [eye, setEye] = useState(true);
  const [alert, setAlert] = useState(false);
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState("");
  let timeout = null;
  const [submiting, setSubmiting] = useState(false);

  const navigate = useNavigate();

  const submitter = async (e) => {
    e.preventDefault();
    const form = forgotRef.current;

    const email = form.email.value;
    const otp = form.otp.value;
    const password = form.password.value;
    setSubmiting(true);

    if (!password || !email || !otp) {
      const message = "Please fill all fields";
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
      setSubmiting(false);
      return;
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      const message = "Please fill Valid email address";
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
      setSubmiting(false);
      return;
    }

    if (otp.length != 6) {
      const message = "OTP should be 6 characters";
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
      setSubmiting(false);
      return;
    }

    try {
      const res = await api.put("/auth/reset", {
        email,
        password,
        otp,
      });
      setSubmiting(false);
      navigate("/auth?type=log", { replace: true });
    } catch (error) {
      if (error.response.status == 400) {
        const message = "Please fill all fields";
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
        setSubmiting(false);
      } else if (error.response.status == 409) {
        const message = "Check your email or OTP one of them is incorrect";
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
      setSubmiting(false);
    }
  };

  const otpController = (e) => {
    const inputVal = e.target.value;
    const numbers = Array.from({ length: 10 }, (_, i) => `${i}`);

    if (inputVal.length >= 6) {
      e.target.value = inputVal.slice(0, 6);
      return;
    }

    let value = "";

    for (let i of inputVal) {
      if (numbers.includes(i)) {
        value += i;
        continue;
      }
      break;
    }

    e.target.value = value;
  };

  return (
    <div className="w-screen h-screen grid place-content-center bg-primary">
      <Alert msg={msg} type={type} on={alert} />
      <div className="border border-second/80 shadow-[0_0_1rem_var(--color-accent)] w-70 text-[0.8rem] p-2 rounded-xl bg-second/10 animate-auth text-second">
        <figure className="flex flex-col items-center p-4">
          <img
            src={logo}
            alt=""
            width={100}
            className="w-8 border border-second rounded-full "
          />
          <figcaption className="text-[0.8rem] flex flex-col items-center">
            <h1 className="font-bold">Abidin</h1>
            <p className="text-[0.6rem]">Track your progress in remedan</p>
          </figcaption>
        </figure>
        <hr className="w-1/2 mx-auto mb-4" />

        <form
          onSubmit={submitter}
          ref={forgotRef}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-bold flex gap-1 items-center"
            >
              <Mail className="w-5" />
              <span>Email</span>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border px-2 py-1 rounded-lg border-second/50 focus:outline-none focus:border-second"
              placeholder="Type Your Email"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="otp" className="font-bold flex gap-1 items-center">
              <ShieldCheck className="w-5" />
              <span>OTP</span>
            </label>
            <input
              onInput={otpController}
              type="text"
              name="otp"
              id="otp"
              autoComplete="off"
              className="border px-2 py-1 rounded-lg border-second/50 focus:outline-none focus:border-second"
              placeholder="Type code send to your email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="font-bold flex gap-1 items-center"
            >
              <LockIcon className="w-5" />
              <span>New Password</span>
            </label>
            <div className="group border relative rounded-lg border-second/50 focus:outline-none focus-within:border-second w-full">
              <input
                type={eye ? "password" : "text"}
                name="password"
                id="password"
                autoComplete="off"
                className=" px-2 py-1 rounded-lg focus:outline-none  w-[calc(100%-1.4rem)]"
                placeholder="Type Your Password"
              />
              <div
                onClick={() => setEye(!eye)}
                className="absolute top-1/2 -translate-y-1/2 right-[0.2rem]"
              >
                {eye ? <Eye className="w-4" /> : <EyeClosed className="w-4" />}
              </div>
            </div>
          </div>

          <Button submit={!submiting}>
            {!submiting ? (
              <div>Reset Password</div>
            ) : (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin" />
              </div>
            )}
          </Button>
          <p className="text-[0.7rem] text-second/70 text-center">
            Don't have an account ?
            <span
              onClick={() => {
                  navigate("/auth", { replace: true });
              }}
              className="text-second font-bold hover:text-shadow-[0_0_0.1rem_var(--color-second)] hover:scale-105 block p-1 transition duration-500"
            >
              {" "}
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
