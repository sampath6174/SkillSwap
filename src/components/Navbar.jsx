import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const user = localStorage.getItem("user");
  const [showUserMenu, setShowUserMenu] = useState(false);
  function handleUserIcon() {
    setShowUserMenu(!showUserMenu);
  }
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>✦</span> SkillSwap
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/matches">Find Skills</Link>
        {user ? (
          <div
            className="nav_user"
            style={{
              padding: "5px",
              borderRadius: "50%",
              border: " 2px solid orange ",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="user_icon"
              style={{ fontSize: "30px", background: "none", border: "none" }}
              onClick={handleUserIcon}
            >
              👨🏻‍💻
            </button>
            <div
              className={showUserMenu ? "userInfo slidingUserMenu" : "userInfo"}
            >
              {showUserMenu && <div className="user-menu-content">

    <section className="user-menu-section user-profile" >
        <div className="user-avatar">
            👨🏻‍💻
        </div>

        <div style={{color:"balck"}}>
            <h2 style={{color:'black'}}>Hello, User</h2>
            <p style={{color:'black'}}>user@example.com</p>
        </div>
    </section>

    <section className="user-menu-section">
        <h3>Account</h3>

        <button className="user-menu-item">
            👤
            <span>
                <strong>User Info</strong>
                <small>View your profile</small>
            </span>
        </button>

        <button className="user-menu-item">
            ✏️
            <span>
                <strong>Edit Profile</strong>
                <small>Update your information</small>
            </span>
        </button>
    </section>

    <section className="user-menu-section">
        <h3>Support</h3>

        <button className="user-menu-item">
            📩
            <span>
                <strong>Contact Me</strong>
                <small>Get in touch with SkillSwap</small>
            </span>
        </button>
    </section>

    <section className="user-menu-section">
        <h3>Preferences</h3>

        <button className="user-menu-item">
            ⚙️
            <span>
                <strong>Settings</strong>
                <small>Manage your preferences</small>
            </span>
        </button>
    </section>

    <section className="user-menu-section logout-section">
        <button className="user-menu-item logout-button">
            🚪
            <span>
                <strong>Logout</strong>
                <small>Sign out of your account</small>
            </span>
        </button>
    </section>

</div>}
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn" id="register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
