import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== cPassword) {
      alert("Passwords didn't match!");
      return;
    }

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);

    alert(data.message);

    if (response.ok) {
      navigate("/login");
    }
  }
  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-info">
          <div className="hero-badge">✦ JOIN THE COMMUNITY</div>

          <h1>
            Create Your
            <span> Account.</span>
          </h1>

          <p>
            Join thousands of learners and teachers exchanging skills every day.
          </p>

          <div className="auth-points">
            <div>
              <span>✦</span>
              Find people with complementary skills
            </div>

            <div>
              <span>✦</span>
              Learn from real people
            </div>

            <div>
              <span>✦</span>
              Share what you already know
            </div>
          </div>
        </div>

        <div className="auth-card">
          <h2>Create Account</h2>

          <p>Start your SkillSwap journey</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>

            <input
              type="password"
              required
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <button type="submit" className="auth-button">
              Create Account →
            </button>
          </form>

          <p className="auth-bottom">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
