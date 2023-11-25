"use client"

import { useContext } from "react";
import { RegisterContext } from "./_provider/RegisterProvider";
import { RegisterContextType } from "./_type/RegisterType";
import Loading from "@/components/Loading/Loading";

export default function Register(props: any) {
  const { registerRequest, setRegisterRequest, onSubmit, status } = useContext(
    RegisterContext
  ) as RegisterContextType;

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterRequest({
      ...registerRequest,
      [e.target.name]: e.target.value,
    });

  return (
    <>
      <div className="wrapper">
        <div className="title">Register Form</div>
        <form action="#">
          <div className="field">
            <input
              type="text"
              required
              name="username"
              onChange={onChangeField}
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="password"
              required
              name="password"
              onChange={onChangeField}
            />
            <label>Password</label>
          </div>
          <div className="field">
            <input
              type="password"
              required
              name="re_password"
              onChange={onChangeField}
            />
            <label>Re-Password</label>
          </div>
          {status.error && <div className="error">{status.error}</div>}
          <div className="field">
            <input
              type="submit"
              value="Register"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                e.preventDefault();
                onSubmit();
              }}
            />
          </div>
          <div className="flex">
            <button type="button" className="auth-with-google-btn">
              Register with Google
            </button>
          </div>
          <div className="signup-link">
            <a href="/login">Login now</a>
          </div>
        </form>
      </div>
      {status.isLoading && <Loading />}
    </>
  );
}
