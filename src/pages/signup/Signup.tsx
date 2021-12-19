import { FC, FormEvent, useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.scss";

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
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
