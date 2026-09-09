import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Messages() {

    const navigate = useNavigate();

    const [connections, setConnections] = useState([]);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        const loggedUser = JSON.parse(storedUser);

        fetch(`http://localhost:3000/connections/user/${loggedUser.id}`)
            .then(response => response.json())
            .then(data => {

                setConnections(data.connections || []);

            })
            .catch(error => {

                console.log(error);

            });

    }, [navigate]);


    return (
        <>
            <Navbar />

            <main className="messages-page">

                <div className="messages-container">

                    <div className="messages-header">

                        <h1>Messages</h1>

                        <p>
                            Your conversations with your connections
                        </p>

                    </div>


                    <div className="messages-list">

                        {connections.length === 0 ? (

                            <p className="no-messages">
                                You don't have any conversations yet.
                            </p>

                        ) : (

                            connections.map((person) => (

                                <div
                                    key={person.id}
                                    className="message-user"
                                    onClick={() =>
                                        navigate(`/chat/${person.user_id}`)
                                    }
                                >

                                    <div className="message-user-avatar">

                                        {person.name
                                            ? person.name.charAt(0).toUpperCase()
                                            : "U"}

                                    </div>


                                    <div className="message-user-info">

                                        <h3>
                                            {person.name}
                                        </h3>

                                        <p>
                                            Click to open conversation
                                        </p>

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

export default Messages;