import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import Button from "../components/Button";
import logo from "../assets/logo.jpg";
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
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState("");
  const setError = useStore((state) => state.setAlert);
  let timeout = null;
  const btnRef = useRef();
  const forgotRef = useRef();

  const loginRef = useRef();
  const signupRef = useRef();

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
      console.log(error);
      setError(true);
    }
  };

  const submitter = async (e) => {
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
        navigate("/", { replace: true });
      } catch (error) {
        if (error.response.status == 401) {
          try {
            const res = await api.post("/auth/resend", { email });
            setEmail(email);

            setError(false);
            if (res.status == 201) {
              navigate("/validate", { replace: true });
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
            setError(true);
          }
        } else {
          const status = error.response?.status;
          if (status == 409) {
            const message = "Your Email or Password is incorrect";
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
          }
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
      console.log(error);
      setError(true);
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

  return (
    <div className="w-screen h-screen grid place-content-center bg-amber-50">
      <Alert msg={msg} type={type} on={alert} />
      <div className="shadow-2xl border border-black/20 w-70 text-[0.8rem] p-2 rounded-xl bg-white">
        <figure className="flex flex-col items-center p-4">
          <img src={logo} alt="" width={100} className="w-8 rounded-full " />
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
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="border px-2 py-1 rounded-lg border-black/50 focus:outline-none focus:border-black"
                placeholder="Type Your Email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <div className="group border relative rounded-lg border-black/50 focus:outline-none focus-within:border-black w-full">
                <input
                  type={eye ? "password" : "text"}
                  name="password"
                  id="password"
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
                className="text-[0.7rem] text-black/80 text-end pr-4"
              >
                forgot password ?
              </p>
            </div>

            <Button submit={true}>
              <div ref={btnRef}>Login</div>
            </Button>
            <p className="text-[0.7rem] text-black/70 text-center">
              Don't have an account ?
              <span
                onClick={() => {
                  setLogin(false);
                }}
                className="text-black"
              >
                {" "}
                Register
              </span>
            </p>
          </form>
        ) : (
          <form
            onSubmit={submitter}
            ref={signupRef}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border px-2 py-1 rounded-lg border-black/50 focus:outline-none focus:border-black"
                placeholder="Type Your Full Name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border px-2 py-1 rounded-lg border-black/50 focus:outline-none focus:border-black"
                placeholder="Type Your Email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <div className="group border relative rounded-lg border-black/50 focus:outline-none focus-within:border-black w-full">
                <input
                  type={eye ? "password" : "text"}
                  name="password"
                  id="password"
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

            <Button submit={true}>
              <div>Register</div>
            </Button>
            <p className="text-[0.7rem] text-black/70 text-center">
              Already registered ?
              <span
                onClick={() => {
                  setLogin(true);
                }}
                className="text-black"
              >
                {" "}
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
