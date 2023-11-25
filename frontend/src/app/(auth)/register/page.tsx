export default function Register(props: any) {
  return (
    <>
      <div className="wrapper">
        <div className="title">Register Form</div>
        <form action="#">
          <div className="field">
            <input type="text" required />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input type="password" required />
            <label>Password</label>
          </div>
          <div className="field">
            <input type="password" required />
            <label>Re-Password</label>
          </div>
          <div className="field">
            <input type="submit" value="Register" />
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
    </>
  );
}
