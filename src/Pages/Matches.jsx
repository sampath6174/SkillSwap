import { Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function Matches() {

const [connectionStatuses, setConnectionStatuses] = useState({});
  const [users, setUsers] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [sortBy, setSortBy] = useState("Best Match");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Matches");

  // Get all users
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get logged-in user's complete profile
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    const loggedUser = JSON.parse(storedUser);

    fetch(`http://localhost:3000/users/${loggedUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentProfile(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser || users.length === 0) {
        return;
    }

    const loggedUser = JSON.parse(storedUser);

    users.forEach((person) => {

        if (person.id === loggedUser.id) {
            return;
        }

        fetch(
            `http://localhost:3000/connections/status/${loggedUser.id}?otherUserId=${person.id}`
        )
            .then(response => response.json())
            .then(data => {

                setConnectionStatuses(prev => ({
                    ...prev,
                    [person.id]: data.status
                }));

            })
            .catch(error => {
                console.log(error);
            });

    });

}, [users]);

  function calculateMatch(person) {
    if (!currentProfile) {
      return 0;
    }

    const myTeachSkills = (currentProfile.teach_skills || "")
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter((skill) => skill !== "");

    const myLearnSkills = (currentProfile.learn_skills || "")
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter((skill) => skill !== "");

    const theirTeachSkills = (person.teach_skills || "")
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter((skill) => skill !== "");

    const theirLearnSkills = (person.learn_skills || "")
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter((skill) => skill !== "");

    let matches = 0;

    myLearnSkills.forEach((skill) => {
      if (theirTeachSkills.includes(skill)) {
        matches++;
      }
    });

    myTeachSkills.forEach((skill) => {
      if (theirLearnSkills.includes(skill)) {
        matches++;
      }
    });

    const totalSkills = myLearnSkills.length + myTeachSkills.length;

    if (totalSkills === 0) {
      return 0;
    }

    return Math.round((matches / totalSkills) * 100);
  }

  function matchesCategory(person) {

    if (category === "All Matches") {
        return true;
    }

    const skills = (
        (person.teach_skills || "") + "," +
        (person.learn_skills || "")
    ).toLowerCase();

    if (category === "Programming") {
        return (
            skills.includes("javascript") ||
            skills.includes("react") ||
            skills.includes("java") ||
            skills.includes("python") ||
            skills.includes("node") ||
            skills.includes("express") ||
            skills.includes("c++") ||
            skills.includes("c#")
        );
    }

    if (category === "Design") {
        return (
            skills.includes("figma") ||
            skills.includes("ui") ||
            skills.includes("ux") ||
            skills.includes("photoshop") ||
            skills.includes("design")
        );
    }

    if (category === "Data") {
        return (
            skills.includes("sql") ||
            skills.includes("mysql") ||
            skills.includes("python") ||
            skills.includes("data science") ||
            skills.includes("machine learning") ||
            skills.includes("excel")
        );
    }

    if (category === "Business") {
        return (
            skills.includes("marketing") ||
            skills.includes("sales") ||
            skills.includes("business") ||
            skills.includes("finance") ||
            skills.includes("management")
        );
    }

    if (category === "Languages") {
        return (
            skills.includes("english") ||
            skills.includes("hindi") ||
            skills.includes("telugu") ||
            skills.includes("spanish") ||
            skills.includes("french")
        );
    }

    return true;
}

async function handleConnect(receiverId) {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        alert("Please login first");
        return;
    }

    const loggedUser = JSON.parse(storedUser);

    const response = await fetch("http://localhost:3000/connections", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sender_id: loggedUser.id,
            receiver_id: receiverId
        })
    });

    const data = await response.json();

alert(data.message);

if (response.ok) {
    setConnectionStatuses(prev => ({
        ...prev,
        [receiverId]: "pending"
    }));
}
}

  const filteredUsers = users
    .filter((person) => person.id !== currentProfile?.id)
    .filter((person) => calculateMatch(person) >=0)
    .filter(person => matchesCategory(person))
    .filter((person) => {
      const searchText = search.toLowerCase();

      return (
        person.name.toLowerCase().includes(searchText) ||
        (person.bio || "").toLowerCase().includes(searchText) ||
        (person.teach_skills || "").toLowerCase().includes(searchText) ||
        (person.learn_skills || "").toLowerCase().includes(searchText)
      );
    });

  if (sortBy === "Best Match") {
    filteredUsers.sort((a, b) => calculateMatch(b) - calculateMatch(a));
  }
  return (
    <>
      <Navbar />

      <main className="matches-page">
        <section className="matches-top">
          <div>
            <div className="hero-badge">✦ DISCOVER PEOPLE</div>

            <h1>
              Find Your
              <span> Skill Match.</span>
            </h1>

            <p>
              Connect with people who can teach what you want to learn and learn
              from what you already know.
            </p>
          </div>

          <div className="match-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search skills, people..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* FILTERS */}

        <section className="match-filters">

    <button
        className={`filter ${category === "All Matches" ? "active" : ""}`}
        onClick={() => setCategory("All Matches")}
    >
        All Matches
    </button>

    <button
        className={`filter ${category === "Programming" ? "active" : ""}`}
        onClick={() => setCategory("Programming")}
    >
        Programming
    </button>

    <button
        className={`filter ${category === "Design" ? "active" : ""}`}
        onClick={() => setCategory("Design")}
    >
        Design
    </button>

    <button
        className={`filter ${category === "Data" ? "active" : ""}`}
        onClick={() => setCategory("Data")}
    >
        Data
    </button>

    <button
        className={`filter ${category === "Business" ? "active" : ""}`}
        onClick={() => setCategory("Business")}
    >
        Business
    </button>

    <button
        className={`filter ${category === "Languages" ? "active" : ""}`}
        onClick={() => setCategory("Languages")}
    >
        Languages
    </button>

</section>

        <div className="results-header">
          <div>
            <strong>{filteredUsers.length} people</strong>

            <span> found for you</span>
          </div>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Best Match</option>
            <option>Most Recent</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {/* MATCH CARDS */}

        <section className="match-grid">
          {filteredUsers.map((person) => (
            <article className="advanced-match-card" key={person.id}>
              <div className="match-card-top">
                <div className="large-avatar">{person.name.charAt(0)}</div>

                <div className="match-score">
                  <strong>{calculateMatch(person)}%</strong>

                  <small>Match</small>
                </div>
              </div>

              <h2>{person.name}</h2>

              <p className="person-role">{person.bio || "SkillSwap member"}</p>

              <div className="skill-group">
                <span className="skill-label">TEACHES</span>

                <div className="skill-list">
                  {(person.teach_skills || "").split(",").map((skill) => (
                    <span className="match-skill teach-skill" key={skill}>
                      ✦ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skill-group">
                <span className="skill-label">WANTS TO LEARN</span>

                <div className="skill-list">
                  {(person.learn_skills || "").split(",").map((skill) => (
                    <span className="match-skill learn-skill" key={skill}>
                      ◇ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="match-actions">
                <Link to={`/profile/${person.id}`} className="view-profile">
                  View Profile
                </Link>

                <button
    className="connect-button"
    onClick={() => handleConnect(person.id)}
    disabled={
        connectionStatuses[person.id] === "pending" ||
        connectionStatuses[person.id] === "accepted"
    }
>
    {connectionStatuses[person.id] === "pending"
        ? "Request Sent"
        : connectionStatuses[person.id] === "accepted"
        ? "Connected ✓"
        : "Connect →"}
</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default Matches;
