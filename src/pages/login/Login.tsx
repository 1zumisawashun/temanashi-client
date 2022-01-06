import { FC, FormEvent } from "react";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-container">
      <div className="wrapper">
        <div className="form">
          <h1>login</h1>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="xyz@gmail.com"
            />
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Must have atleast 6 characters"
            />

            {!isPending && <button type="submit">Login</button>}
            {isPending && (
              <button type="submit" disabled>
                Loading
              </button>
            )}
            {error && <div className="error">{error}</div>}
            <div className="forgot-signup">
              <Link to="/signup">Forgot password?</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
