import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function SkillSwaps() {
    const navigate = useNavigate();

    const [swaps, setSwaps] = useState([]);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        const loggedUser = JSON.parse(storedUser);

        fetch(`http://localhost:3000/skill-swaps/${loggedUser.id}`)
            .then(response => response.json())
            .then(data => {
                setSwaps(data.swaps || []);
            })
            .catch(error => {
                console.log(error);
            });

    }, [navigate]);


    return (
        <>
            <Navbar />

            <main className="connections-page">

                <div className="connections-container">

                    <div className="connections-header">

                        <h1>
                            My Skill Swaps
                        </h1>

                        <p>
                            Your active skill exchanges
                        </p>

                    </div>


                    <div className="connections-list">

                        {swaps.length === 0 ? (

                            <p className="no-connections">
                                You don't have any active skill swaps yet.
                            </p>

                        ) : (

                            swaps.map((swap) => (

                                <div
                                    className="connection-item"
                                    key={swap.id}
                                >

                                    <div className="connection-user">

                                        <div className="connection-avatar">
                                            ⇄
                                        </div>

                                        <div>

                                            <h2>
                                                Skill Swap
                                            </h2>

                                            <p>
                                                Swap #{swap.id}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="connection-skills">

                                        <div>
                                            <strong>
                                                You teach:
                                            </strong>

                                            <span>
                                                {swap.skill1}
                                            </span>
                                        </div>


                                        <div>
                                            <strong>
                                                You learn:
                                            </strong>

                                            <span>
                                                {swap.skill2}
                                            </span>
                                        </div>


                                        <div>
                                            <strong>
                                                Status:
                                            </strong>

                                            <span>
                                                {swap.status}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </main>
        </>
    );
}

export default SkillSwaps;