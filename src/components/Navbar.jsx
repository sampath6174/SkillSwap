import { Link, useNavigate, } from "react-router-dom";
import { useEffect, useState } from "react";


function Navbar() {

  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);



  // Fetch notifications
  useEffect(() => {

    if (!user) {
      return;
    }

    const loggedUser = JSON.parse(user);

    function fetchNotifications() {

      fetch(`http://localhost:3000/notifications/${loggedUser.id}`)
        .then(response => response.json())
        .then(data => {

          setNotifications(data.notifications || []);

        })
        .catch(error => {
          console.log(error);
        });

    }

    // Fetch immediately
    fetchNotifications();

    // Check for new notifications every 5 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    // Stop checking when Navbar is removed
    return () => {
      clearInterval(interval);
    };

  }, [user]);


  // Mark notifications as read
  async function handleNotificationClick() {

    setShowNotifications(!showNotifications);

    if (!showNotifications && user) {

      const loggedUser = JSON.parse(user);

      try {

        await fetch(
          `http://localhost:3000/notifications/${loggedUser.id}/read`,
          {
            method: "PUT"
          }
        );

        // Immediately remove unread count from UI
        setNotifications(prev =>
          prev.map(notification => ({
            ...notification,
            is_read: 1
          }))
        );

      } catch (error) {

        console.log(error);

      }

    }

  }


  const unreadCount = notifications.filter(
    notification => notification.is_read === 0
  ).length;


  return (
    <nav className="navbar">
      <div className="mobile-nav-left">

  <button
    className="hamburger-button"
    onClick={() => setShowMobileMenu(!showMobileMenu)}
  >
    {showMobileMenu ? "✕" : "☰"}
  </button>

  <Link to="/" className="logo">
    <span>✦</span> SkillSwap
  </Link>

</div>


      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/matches">Find Skills</Link>
        

{user && (
    <>
        <Link to="/connections">Connections</Link>

        <Link to="/messages">Messages</Link>
    </>
)}


        {user ? (

          <>

            {/* NOTIFICATION ICON */}

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center"
              }}
            >

              <button
                onClick={handleNotificationClick}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "25px",
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                🔔

                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-3px",
                      right: "-5px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      minWidth: "18px",
                      height: "18px",
                      fontSize: "11px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold"
                    }}
                  >
                    {unreadCount}
                  </span>
                )}

              </button>


              {/* NOTIFICATION DROPDOWN */}

              {showNotifications && (

                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: "0",
                    width: "320px",
                    background: "white",
                    borderRadius: "12px",
                    padding: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    zIndex: "1000",
                    color: "black"
                  }}
                >

                  <h3 style={{ marginTop: "0" }}>
                    Notifications
                  </h3>


                  {notifications.length === 0 ? (

                    <p>
                      No notifications
                    </p>

                  ) : (

                    notifications.map((notification) => (

                      <div
                        key={notification.id}
                        style={{
                          padding: "12px 8px",
                          borderBottom: "1px solid #ddd",
                          fontSize: "14px",
                          background:
                            notification.is_read === 0
                              ? "#f3f0ff"
                              : "white"
                        }}
                      >

                        {notification.is_read === 0 && (
                          <span
                            style={{
                              color: "#7c3aed",
                              marginRight: "6px"
                            }}
                          >
                            ●
                          </span>
                        )}

                        {notification.message}

                      </div>

                    ))

                  )}

                </div>

              )}

            </div>


            {/* USER MENU */}

            <div
              className="nav_user"
              style={{
                padding: "5px",
                borderRadius: "50%",
                border: "2px solid orange",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <button
  className="user_icon"
  style={{
    fontSize: "30px",
    background: "none",
    border: "none"
  }}
  onClick={() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      navigate(`/profile/${loggedUser.id}`);
    }
  }}
>
  👨🏻‍💻
</button>


             

            </div>

          </>

        ) : (

          <>

            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
              id="register"
            >
              Register
            </Link>

          </>

        )}

      </div>
      {showMobileMenu && (
  <div className="mobile-menu">

    <Link
      to="/"
      onClick={() => setShowMobileMenu(false)}
    >
      Home
    </Link>

    <Link
      to="/matches"
      onClick={() => setShowMobileMenu(false)}
    >
      Find Skills
    </Link>

    {user && (
      <>
        <Link
          to="/connections"
          onClick={() => setShowMobileMenu(false)}
        >
          Connections
        </Link>

        <Link
          to="/messages"
          onClick={() => setShowMobileMenu(false)}
        >
          Messages
        </Link>
      </>
    )}

  </div>
)}

    </nav>
  );
}

export default Navbar;