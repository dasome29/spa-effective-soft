import styles from "../styles/page.module.css";
import { FormEvent, useState } from "react";
import { mockLoginApiFetch } from "./api/mock-fetch";

function LoggedInView() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Ciao!</h1>
        <p>You logged into my SPA for my interview process.</p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await mockLoginApiFetch(email, password);
      setIsLoggedIn(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <LoggedInView />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
