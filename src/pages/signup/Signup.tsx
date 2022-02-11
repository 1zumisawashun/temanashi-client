import { FC, FormEvent, useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // nullチェックで早期リターン
    if (thumbnail === null) return;
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(null);
    let selected;
    // NOTE:型定義のnullエラー対策
    if (e.target.files !== null) {
      selected = e.target.files[0];
    }
    if (!selected) {
      setThumbnailError("please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("selected file must be an image");
      return;
    }
    if (selected.size > 1000000) {
      setThumbnailError("image file size must be less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <div className="auth-container">
      <div className="wrapper -w30">
        <div className="form">
          <h1>Sign up</h1>
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
            <input
              required
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              placeholder="your name"
            />
            <input required type="file" onChange={handleFileChange} />
            {thumbnailError && <div className="error">{thumbnailError}</div>}

            {!isPending && <button type="submit">Sign up</button>}
            {isPending && (
              <button type="submit" disabled>
                loading
              </button>
            )}
            {error && <div className="error">{error}</div>}

            <div className="forgot-signup">
              <Link to="/login">Forgot password?</Link>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
