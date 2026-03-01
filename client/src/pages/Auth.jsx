import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Eye,
  EyeClosed,
  Mail,
  UserCircle,
  LockIcon,
  Loader,
} from "lucide-react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import api from "../config/api.config";
import useStore from "../store/useStore";
import Alert from "../components/Alert";

const Auth = () => {
  const [searcheParams] = useSearchParams();
  const [login, setLogin] = useState(false);
  const log = useStore((state) => state.user.log);
  const setLog = useStore((state) => state.setLog);
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  const setName = useStore((state) => state.setName);
  const setEmail = useStore((state) => state.setEmail);
  const [alert, setAlert] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState("");
  const setError = useStore((state) => state.setAlert);
  let timeout = null;
  const btnRef = useRef();
  const forgotRef = useRef();

  const loginRef = useRef();
  const signupRef = useRef();

  const wrapperRef = useRef();

  const forgotController = async () => {
    const form = loginRef.current;
    const email = form.email.value;

    if (!email) {
      const message = "Please Fill The Email Field";
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
      return;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      const message = "Invalid Email Address";
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
      return;
    }

    try {
      const res = await api.post("/auth/forgot", { email });
      setEmail(email);
      setError(false);
      navigate("/reset");
    } catch (error) {
      const message =
        error.status == 409
          ? "User does not exists please try to register"
          : error.status == 429
            ? "Please try again after 15 minutes you reached your 15 minutes request limit"
            : "Please Fill Valid Email Address";
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
      setError(true);
    }
  };

  const submitter = async (e) => {
    setSubmiting(true);
    e.preventDefault();
    if (loginRef.current == e.target) {
      const form = loginRef.current;

      const email = form.email.value;
      const password = form.password.value;

      if (!password || !email) {
        const message = "Please Fill Both Email And Password Field";
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
        const message = "Please Fill Valid Email Address";
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
        const res = await api.post("/auth/login", {
          email,
          password,
        });
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setLog(true);
        navigate(0);
      } catch (error) {
        if (error.response.status == 401) {
          try {
            const res = await api.post("/auth/resend", { email });
            setEmail(email);

            setError(false);
            if (res.status == 201) {
              navigate(0);
            }
          } catch (error) {
            const status = error.response?.status;
            let message;
            if (status == 409) {
              message = "Your Email is incorrect";
            } else if (status == 401) {
              message = "Email is required please fill the email field";
            } else {
              message = "You have reached your tday's limit please try tomorow";
            }
            if (msg == message) {
              return;
            }

            if (timeout) {
              clearTimeout(timeout);
            }
            setType(false);
            setAlert(true);
            setMsg(message);
            timeout = setTimeout(() => {
              setAlert(false);
              setMsg("");
              timeout = null;
            }, 5000);
            setSubmiting(false);
            setError(true);
          }
        } else {
          const message =
            error.status == 409
              ? "User exists please try to log in"
              : error.status == 429
                ? "Please try again after 15 minutes you reached your 15 minutes request limit"
                : "Please Fill Valid Email Address";
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
        }
      }
      return;
    }
    const form = signupRef.current;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!password || !email || !name) {
      const message = "Please Fill All Fields";
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
      const message = "Please Fill Valid Email Address";
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
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      setError(false);
      navigate("/validate", { replace: true });
    } catch (error) {
      const message =
        error.status == 409
          ? "User exists please try to log in"
          : error.status == 429
            ? "Please try again after 15 minutes you reached your 15 minutes request limit"
            : "Please Fill Valid Email Address";
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
      setError(true);
      setSubmiting(false);
    }
  };

  document.body.addEventListener("click", (e) => {
    if ([btnRef.current, forgotRef.current].includes(e.target)) return;

    setAlert(false);
    setMsg("");
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = null;
  });

  useEffect(() => {
    if (log) {
      navigate("/", { replace: true });
    }
    if (searcheParams.get("type") == "log") {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    const elem = wrapperRef.current;
    elem.style.display = "none";
    setTimeout(() => {
      elem.style.display = "block";
    }, 100);
  }, [login]);

  return (
    <div className="w-screen h-screen grid place-content-center text-second bg-primary">
      <Alert msg={msg} type={type} on={alert} />
      <div
        ref={wrapperRef}
        className="border border-second/80 shadow-[0_0_1rem_var(--color-accent)] w-70 text-[0.8rem] p-2 rounded-xl bg-second/10 animate-auth transition"
      >
        <figure className="flex flex-col items-center gap-2 p-4">
          <img
            src={logo}
            alt=""
            width={100}
            className="w-8 rounded-full shadow-[0_0_0.4rem_var(--color-accent)]"
          />
          <figcaption className="text-[0.8rem] flex flex-col items-center">
            <h1 className="font-bold">Abidin</h1>
            <p className="text-[0.6rem]">Track your progress in remedan</p>
          </figcaption>
        </figure>
        <hr className="w-1/2 mx-auto mb-4" />
        {login ? (
          <form
            onSubmit={submitter}
            ref={loginRef}
            className="flex flex-col gap-2 animate-auth"
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
                autoComplete="off"
                id="email"
                className="border px-2 py-1 rounded-lg border-second/50 focus:outline-none focus:border-second"
                placeholder="Type Your Email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="font-bold flex items-center gap-1"
              >
                <LockIcon className="w-5" />
                <span>Password</span>
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
                  {eye ? (
                    <Eye className="w-4" />
                  ) : (
                    <EyeClosed className="w-4" />
                  )}
                </div>
              </div>
              <p
                ref={forgotRef}
                onClick={forgotController}
                className="text-[0.7rem]  text-end pr-4"
              >
                forgot password ?
              </p>
            </div>

            <Button submit={!submiting}>
              {!submiting ? (
                <div ref={btnRef}>Login</div>
              ) : (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              )}
            </Button>
            <p className="text-[0.7rem] text-second/70 flex justify-center items-center">
              Don't have an account ?
              <span
                onClick={() => {
                  setLogin(false);
                }}
                className="text-second font-bold hover:text-shadow-[0_0_0.1rem_var(--color-second)] hover:scale-105 block p-1 transition duration-500"
              >
                Register
              </span>
            </p>
          </form>
        ) : (
          <form
            onSubmit={submitter}
            ref={signupRef}
            className="flex flex-col gap-2 animate-auth"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-bold flex items-center gap-1"
              >
                <UserCircle className="w-5" />
                <span>Name</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                className="border px-2 py-1 rounded-lg border-second/50 focus:outline-none focus:border-second"
                placeholder="Type Your Full Name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-bold flex items-center gap-1"
              >
                <Mail className="w-5" />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                className="border px-2 py-1 rounded-lg border-second/50 focus:outline-none focus:border-second"
                placeholder="Type Your Email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="font-bold flex items-center gap-1"
              >
                <LockIcon className="w-5" />
                <span>Password</span>
              </label>
              <div className="group border relative rounded-lg border-second/50 focus:outline-none focus-within:border-second w-full">
                <input
                  type={eye ? "password" : "text"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  className=" px-2 py-1 rounded-lg focus:outline-none  w-[calc(100%-1.4rem)]"
                  placeholder="Type Password"
                />
                <div
                  onClick={() => setEye(!eye)}
                  className="absolute top-1/2 -translate-y-1/2 right-[0.2rem]"
                >
                  {eye ? (
                    <Eye className="w-4" />
                  ) : (
                    <EyeClosed className="w-4" />
                  )}
                </div>
              </div>
            </div>

            <Button submit={!submiting}>
              {!submiting ? (
                <div>Register</div>
              ) : (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              )}
            </Button>
            <p className="text-[0.7rem] flex items-center justify-center text-second/70">
              Already registered ?
              <span
                onClick={() => {
                  setLogin(true);
                }}
                className="text-second font-bold hover:text-shadow-[0_0_0.1rem_var(--color-second)] hover:scale-105 block p-1 transition duration-500"
              >
                log in
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
