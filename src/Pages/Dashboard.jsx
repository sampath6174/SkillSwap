import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [connectionsCount, setConnectionsCount] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [swapsCount, setSwapsCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    const loggedUser = JSON.parse(storedUser);
    fetch(`${API_URL}/connections/user/${loggedUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setConnectionsCount(data.connections?.length || 0);
      })
      .catch((error) => {
        console.log(error);
      });

      fetch(`${API_URL}/skill-swaps/${loggedUser.id}`)
    .then(response => response.json())
    .then(data => {
        setSwapsCount(data.swaps?.length || 0);
    })
    .catch(error => {
        console.log(error);
    });

    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        const users = data.users || [];

        const teachSkills = (loggedUser.teach_skills || "")
          .split(",")
          .map((skill) => skill.trim().toLowerCase())
          .filter((skill) => skill !== "");

        const learnSkills = (loggedUser.learn_skills || "")
          .split(",")
          .map((skill) => skill.trim().toLowerCase())
          .filter((skill) => skill !== "");

        const matches = users.filter((person) => {
          if (person.id === loggedUser.id) {
            return false;
          }

          const personTeachSkills = (person.teach_skills || "")
            .split(",")
            .map((skill) => skill.trim().toLowerCase());

          const personLearnSkills = (person.learn_skills || "")
            .split(",")
            .map((skill) => skill.trim().toLowerCase());

          const canTeachMe = personTeachSkills.some((skill) =>
            learnSkills.includes(skill),
          );

          const canLearnFromMe = personLearnSkills.some((skill) =>
            teachSkills.includes(skill),
          );

          return canTeachMe && canLearnFromMe;
        });

        setMatchesCount(matches.length);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`${API_URL}/users/${loggedUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  const teachSkills = (user.teach_skills || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");

  const learnSkills = (user.learn_skills || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <aside className="dashboard-sidebar">
          <div className="profile-mini">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>

            <p>Hyderabad, India</p>
          </div>

          <div className="side-menu">
            <Link className="side-active" to="/dashboard">
              ◈ Dashboard
            </Link>

            <Link to="/matches">⌕ Find Matches</Link>

            <Link to={`/profile/${user.id}`}>◯ My Profile</Link>

            <div className="settings-menu">

  <button
    className="settings-button" style={{color:"grey"}}
    onClick={() => setShowSettings(!showSettings)}
  >
    ⚙ Settings
  </button>

  {showSettings && (
    <button
      className="logout-button"
      onClick={() => {
        localStorage.removeItem("user");
        navigate("/");
      }}
    >
      🚪 Logout
    </button>
  )}

</div>
          </div>
        </aside>

        <section className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <span className="small-label">DASHBOARD</span>

              <h1>
                Welcome back,
                <span> {user.name}.</span>
              </h1>

              <p>Here's what's happening with your SkillSwap journey.</p>
            </div>

            <Link to="/matches" className="dashboard-action">
              Find Matches →
            </Link>
          </div>

          {/* STATS */}

          <div className="dashboard-stats">
            <div className="stat-card">
              <span>SKILLS ADDED</span>

              <strong>{teachSkills.length + learnSkills.length}</strong>

              <small>Teaching + Learning</small>
            </div>

            <div className="stat-card">
              <span>MATCHES FOUND</span>

              <strong>{matchesCount}</strong>

              <small>Available matches</small>
            </div>

            <div className="stat-card">
              <span>CONNECTIONS</span>

              <strong>{connectionsCount}</strong>

              <small>Your connections</small>
            </div>

            <div className="stat-card">
              <span>SKILL SWAPS</span>

              <strong>{swapsCount}</strong>

              <small>Active swaps</small>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* TEACH */}

            <div className="dashboard-panel">
              <div className="panel-heading">
                <div>
                  <span>✦ TEACH</span>

                  <h2>Skills I Can Teach</h2>
                </div>

                <Link to={`/profile/${user.id}`}>+</Link>
              </div>

              <div className="dashboard-skills">
                {teachSkills.length === 0 ? (
                  <span>No skills added</span>
                ) : (
                  teachSkills.map((skill) => <span key={skill}>{skill}</span>)
                )}
              </div>
            </div>

            {/* LEARN */}

            <div className="dashboard-panel">
              <div className="panel-heading">
                <div>
                  <span>◇ LEARN</span>

                  <h2>Skills I Want</h2>
                </div>

                <Link to={`/profile/${user.id}`}>+</Link>
              </div>

              <div className="dashboard-skills">
                {learnSkills.length === 0 ? (
                  <span>No skills added</span>
                ) : (
                  learnSkills.map((skill) => <span key={skill}>{skill}</span>)
                )}
              </div>
            </div>
          </div>

          {/* RECENT MATCHES */}

          <div className="recent-panel">
            <div className="panel-heading">
              <div>
                <span>✦ RECENT</span>

                <h2>Recent Matches</h2>
              </div>

              <Link to="/matches">View all →</Link>
            </div>

            <div className="recent-list">
              <p>Find people who match your skills from the Matches page.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
