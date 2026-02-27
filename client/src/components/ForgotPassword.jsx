import { useRef, useState } from "react";
import logo from "../assets/logo.jpg";
import { Eye, EyeClosed } from "lucide-react";
import Button from "./Button";
import api from "../config/api.config";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const forgotRef = useRef();
  const [eye, setEye] = useState(true);

  const navigate = useNavigate();

  const submitter = async (e) => {
    e.preventDefault();
    const form = forgotRef.current;

    const email = form.email.value;
    const otp = form.otp.value;
    const password = form.password.value;

    if (!password || !email || !otp) {
      console.log("All requred");
      return;
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      console.log("Invalid Email");
      return;
    }

    if (otp.length != 6) {
      console.log("OTP should be 6 characters");
      return;
    }

    const msg = {
      email,
      password,
      otp,
    };
    try {
      const res = await api.put("/auth/reset", msg);
      navigate("/auth?type=log", { replace: true });
    } catch (error) {
      if (error.response.status == 400) {
        console.log(error.response.data);
      } else if (error.response.status == 409) {
        console.log(error.response.data);
      }
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

        <form
          onSubmit={submitter}
          ref={forgotRef}
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
            <label htmlFor="otp" className="font-bold">
              OTP
            </label>
            <input
              onInput={otpController}
              type="text"
              name="otp"
              id="otp"
              className="border px-2 py-1 rounded-lg border-black/50 focus:outline-none focus:border-black"
              placeholder="Type code send to your email"
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
                {eye ? <Eye className="w-4" /> : <EyeClosed className="w-4" />}
              </div>
            </div>
          </div>

          <Button submit={true}>
            <div>Reset Password</div>
          </Button>
          <p className="text-[0.7rem] text-black/70 text-center">
            Don't have an account ?
            <span
              onClick={() => {
                //   setLogin(false);
              }}
              className="text-black"
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
