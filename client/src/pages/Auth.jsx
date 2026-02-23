import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import Button from "../components/Button";
import logo from "../assets/logo.jpg";
import api from "../config/api.config";
import useStore from "../store/useStore";

const Auth = () => {
  const [searcheParams] = useSearchParams();
  const [login, setLogin] = useState(false);
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  const setName = useStore((state) => state.setName);
  const setEmail = useStore((state) => state.setEmail);

  const loginRef = useRef();
  const signupRef = useRef();

  const submitter = async (e) => {
    e.preventDefault();
    if (loginRef.current == e.target) {
      const form = loginRef.current;

      const email = form.email.value;
      const password = form.password.value;

      if (!password || !email) {
        console.log("All requred");
        return;
      }
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
        console.log("Invalid Email");
        return;
      }

      const msg = {
        email,
        password,
      };
      try {
        const res = await api.post("/auth/login", msg);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        navigate("/", { replace: true });
      } catch (error) {
        if (error.response.status == 401) {
          try {
            const res = await api.post("/auth/resend", { email });
            navigate("/validate", { replace: true });
          } catch (error) {
            console.log(error.response.data);
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
      console.log("All requred");
      return;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      console.log("Invalid Email");
      return;
    }

    const msg = {
      name,
      email,
      password,
    };
    try {
      const res = await api.post("/auth/register", msg);
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      navigate("/validate", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searcheParams.get("type") == "log") {
      setLogin(true);
    }
  }, []);

  return (
    <div className="w-screen h-screen grid place-content-center bg-amber-50">
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
            </div>

            <Button submit={true}>
              <div>Login</div>
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
