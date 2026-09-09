import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import API_URL from "../api";

function Chat() {

    const { userId } = useParams();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [otherUser, setOtherUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        fetch(`f${API_URL}/users/${userId}`)
            .then(response => response.json())
            .then(data => {

                if (data.user) {
                    setOtherUser(data.user);
                }

            })
            .catch(error => {
                console.log(error);
            });

    }, [userId, navigate]);


    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return;
        }

        const loggedUser = JSON.parse(storedUser);

        fetch(
            `${API_URL}/messages/${loggedUser.id}/${userId}`
        )
            .then(response => response.json())
            .then(data => {
                setMessages(data.messages || []);
            })
            .catch(error => {
                console.log(error);
            });

    }, [userId]);


    async function sendMessage(e) {

        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        const loggedUser = JSON.parse(storedUser);

        try {

            const response = await fetch(
                `${API_URL}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sender_id: loggedUser.id,
                        receiver_id: Number(userId),
                        message: message.trim()
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessages(prev => [
                    ...prev,
                    {
                        id: data.messageId,
                        sender_id: loggedUser.id,
                        receiver_id: Number(userId),
                        message: message.trim(),
                        created_at: new Date().toISOString()
                    }
                ]);

                setMessage("");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);
            alert("Failed to send message");

        }
    }


    const storedUser = localStorage.getItem("user");

    const loggedUser = storedUser
        ? JSON.parse(storedUser)
        : null;


    return (
        <>
            <Navbar />

            <main className="chat-page">

                <div className="chat-container">


                    {/* HEADER */}

                    <div className="chat-header">

                        <div className="chat-user">

                            <button
                                className="chat-back-button"
                                onClick={() => navigate("/messages")}
                            >
                                ←
                            </button>

                            <div className="chat-avatar">

                                {otherUser?.name
                                    ? otherUser.name.charAt(0).toUpperCase()
                                    : "U"}

                            </div>

                            <h2>
                                {otherUser?.name || "User"}
                            </h2>

                            <span className="online-dot"></span>

                        </div>


                        <div className="chat-actions">

                            <button
                                title="Voice Call"
                                onClick={() =>
                                    alert("Voice call coming soon")
                                }
                            >
                                📞
                            </button>

                            <button
                                title="Video Call"
                                onClick={() =>
                                    alert("Video call coming soon")
                                }
                            >
                                🎥
                            </button>

                            <button
                                title="More"
                                onClick={() =>
                                    alert("More options coming soon")
                                }
                            >
                                ⋮
                            </button>

                        </div>

                    </div>


                    {/* MESSAGES */}

                    <div className="chat-messages">

                        {messages.length === 0 ? (

                            <div className="no-messages">

                                <p>
                                    Start your conversation with{" "}
                                    {otherUser?.name || "this user"}.
                                </p>

                            </div>

                        ) : (

                            messages.map((item) => (

                                <div
                                    key={item.id}
                                    className={
                                        item.sender_id === loggedUser?.id
                                            ? "message sent"
                                            : "message received"
                                    }
                                >

                                    <p>
                                        {item.message}
                                    </p>

                                    <small>
                                        {new Date(
                                            item.created_at
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </small>

                                </div>

                            ))

                        )}

                    </div>


                    {/* MESSAGE INPUT */}

                    <form
                        className="chat-input-area"
                        onSubmit={sendMessage}
                    >

                        <button
                            type="button"
                            title="Camera"
                            onClick={() =>
                                alert("Camera coming soon")
                            }
                        >
                            📷
                        </button>


                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                        />


                        <button
                            type="button"
                            title="Attachments"
                            onClick={() =>
                                alert("Attachments coming soon")
                            }
                        >
                            📌
                        </button>


                        <button
                            type="button"
                            title="Record Audio"
                            onClick={() =>
                                alert("Audio recording coming soon")
                            }
                        >
                            🎤
                        </button>


                        <button
                            type="submit"
                            title="Send"
                        >
                            ➤
                        </button>

                    </form>

                </div>

            </main>
        </>
    );
}

export default Chat;