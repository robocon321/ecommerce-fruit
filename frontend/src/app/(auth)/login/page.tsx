export default function Login(props: any) {
  return (
    <>
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form action="#">
          <div className="field">
            <input type="text" required />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input type="password" required />
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
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="flex">
            <button type="button" className="auth-with-google-btn" >
              Log in with Google
            </button>
          </div>
          <div className="signup-link">
            Not a member? <a href="/register">Register now</a>
          </div>
        </form>
      </div>
    </>
  );
}
