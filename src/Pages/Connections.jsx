import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import API_URL from "../api";

function Connections() {
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [teachSkill, setTeachSkill] = useState("");
  const [learnSkill, setLearnSkill] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const loggedUser = JSON.parse(storedUser);

    fetch(`${API_URL}/connections/user/${loggedUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setConnections(data.connections || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  return (
    <>
      <Navbar />

      <main className="connections-page">

        <div className="connections-container">

          {/* SKILL SWAP FORM */}

          {selectedPerson && (
            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                border: "1px solid #7c3aed",
                borderRadius: "15px",
                background: "#111827",
              }}
            >

              <h2>
                Start Skill Swap with {selectedPerson.name}
              </h2>

              <input
                type="text"
                placeholder="Skill you want to teach"
                value={teachSkill}
                onChange={(e) => setTeachSkill(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                }}
              />

              <input
                type="text"
                placeholder="Skill you want to learn"
                value={learnSkill}
                onChange={(e) => setLearnSkill(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "15px",
                  padding: "12px",
                }}
              />

              <div style={{ marginTop: "20px" }}>

                <button
    onClick={async () => {

        if (!teachSkill || !learnSkill) {
            alert("Please enter both skills");
            return;
        }

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("Please login first");
            return;
        }

        const loggedUser = JSON.parse(storedUser);

        try {

            const response = await fetch(
                `${API_URL}/skill-swaps`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user1_id: loggedUser.id,
                        user2_id: selectedPerson.user_id,
                        skill1: teachSkill,
                        skill2: learnSkill
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Skill swap started successfully");

                setSelectedPerson(null);
                setTeachSkill("");
                setLearnSkill("");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    }}
>
    Start Skill Swap
</button>

                <button
                  onClick={() => {
                    setSelectedPerson(null);
                    setTeachSkill("");
                    setLearnSkill("");
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>

              </div>

            </div>
          )}


          {/* HEADER */}

          <div className="connections-header">

            <h1>
              My Connections
            </h1>

            <p>
              People you are connected with
            </p>

          </div>


          {/* CONNECTIONS */}

          <div className="connections-list">

            {connections.length === 0 ? (

              <p className="no-connections">
                You don't have any connections yet.
              </p>

            ) : (

              connections.map((person) => (

                <div
                  className="connection-item"
                  key={person.id}
                >

                  <div className="connection-user">

                    <div className="connection-avatar">

                      {person.name
                        ? person.name.charAt(0).toUpperCase()
                        : "U"}

                    </div>

                    <div>

                      <h2>
                        {person.name}
                      </h2>

                      <p>
                        {person.bio || "No bio available"}
                      </p>

                    </div>

                  </div>


                  <div className="connection-skills">

                    <div>

                      <strong>
                        Teaches:
                      </strong>

                      <span>
                        {person.teach_skills || "None"}
                      </span>

                    </div>


                    <div>

                      <strong>
                        Wants to learn:
                      </strong>

                      <span>
                        {person.learn_skills || "None"}
                      </span>

                    </div>

                  </div>


                  <button
                    className="view-profile-button"
                    onClick={() =>
                      navigate(`/profile/${person.user_id}`)
                    }
                  >
                    View Profile
                  </button>


                  <button
                    className="view-profile-button"
                    onClick={() => {
                      setSelectedPerson(person);
                    }}
                  >
                    Start Skill Swap
                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      </main>
    </>
  );
}

export default Connections;