import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

function Requests() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return;
        }

        const loggedUser = JSON.parse(storedUser);

        fetch(`http://localhost:3000/connections/${loggedUser.id}`)
            .then(response => response.json())
            .then(data => {
                setRequests(data.requests || []);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    async function handleRequest(requestId, status) {

        try {

            const response = await fetch(
                `http://localhost:3000/connections/${requestId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status: status
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            if (response.ok) {

                setRequests(
                    requests.filter(
                        request => request.id !== requestId
                    )
                );

            }

        } catch (error) {

            console.log(error);

        }
    }


    return (
        <>
            <Navbar />

            <main className="requests-page">

                <div className="requests-container">

                    <div className="requests-header">

                        <h1>
                            Connection Requests
                        </h1>

                        <p>
                            People who want to connect with you
                        </p>

                    </div>


                    <div className="requests-list">

                        {requests.length === 0 ? (

                            <p className="no-requests">
                                No connection requests yet.
                            </p>

                        ) : (

                            requests.map((request) => (

                                <div
                                    className="request-item"
                                    key={request.id}
                                >

                                    <div className="request-user">

                                        <div className="request-avatar">

                                            {request.name
                                                ? request.name
                                                    .charAt(0)
                                                    .toUpperCase()
                                                : "U"}

                                        </div>


                                        <div>

                                            <h2>
                                                {request.name}
                                            </h2>

                                            <p>
                                                wants to connect with you
                                            </p>

                                        </div>

                                    </div>


                                    <div className="request-actions">

                                        <button
                                            className="accept-request"
                                            onClick={() =>
                                                handleRequest(
                                                    request.id,
                                                    "accepted"
                                                )
                                            }
                                        >
                                            Accept
                                        </button>


                                        <button
                                            className="reject-request"
                                            onClick={() =>
                                                handleRequest(
                                                    request.id,
                                                    "rejected"
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

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

export default Requests;