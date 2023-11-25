"use client";

import { useContext } from "react";
import { LoginContext } from "./_provider/LoginProvider";
import { LoginContextType } from "./_type/LoginType";
import Loading from "@/components/Loading/Loading";

export default function Login(props: any) {
  const { loginRequest, setLoginRequest, onSubmit, status } = useContext(
    LoginContext
  ) as LoginContextType;
  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginRequest({
      ...loginRequest,
      [e.target.name]: e.target.value,
    });

  return (
    <>
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form>
          <div className="field">
            <input
              type="text"
              name="username"
              required
              onChange={onChangeField}
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              required
              onChange={onChangeField}
            />
            <label>Password</label>
          </div>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          {status.error && <div className="error">{status.error}</div>}
          <div className="field">
            <input
              type="submit"
              value="Login"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                e.preventDefault();
                onSubmit();
              }}
            />
          </div>
          <div className="flex">
            <button type="button" className="auth-with-google-btn">
              Log in with Google
            </button>
          </div>
          <div className="signup-link">
            Not a member? <a href="/register">Register now</a>
          </div>
        </form>
      </div>
      {status.isLoading && <Loading />}
    </>
  );
}
