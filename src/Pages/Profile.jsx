import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Profile() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [teachSkills, setTeachSkills] = useState("");
    const [learnSkills, setLearnSkills] = useState("");

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:3000/users/${id}`)
            .then(response => response.json())
            .then(data => {

                if (data.user) {

                    setUser(data.user);

                    setName(data.user.name || "");
                    setBio(data.user.bio || "");
                    setTeachSkills(data.user.teach_skills || "");
                    setLearnSkills(data.user.learn_skills || "");

                }

            })
            .catch(error => {
                console.log(error);
            });

    }, [id, navigate]);


    if (!user) {
        return <p>Loading...</p>;
    }


    const storedUser = localStorage.getItem("user");
    const loggedUser = storedUser
        ? JSON.parse(storedUser)
        : null;

    const isOwnProfile =
        loggedUser && Number(loggedUser.id) === Number(id);


    async function handleSubmit(e) {

    e.preventDefault();

    try {

        const response = await fetch(
            `http://localhost:3000/users/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    bio: bio,
                    teach_skills: teachSkills,
                    learn_skills: learnSkills
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            const updatedUser = {
                ...user,
                name: name,
                bio: bio,
                teach_skills: teachSkills,
                learn_skills: learnSkills
            };

            setUser(updatedUser);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: user.id,
                    name: name,
                    email: user.email
                })
            );

            setIsEditing(false);

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Failed to update profile");

    }
}


    return (
        <>
            <Navbar />

            <main className="profile-page">

                <div className="profile-container">

                    <div className="profile-avatar">
                        {user.name
                            ? user.name.charAt(0).toUpperCase()
                            : "U"}
                    </div>


                    {!isEditing ? (

                        <>
                            <h1>{user.name}</h1>

                            <p className="profile-email">
                                {user.email}
                            </p>

                            <p className="profile-bio">
                                {user.bio || "No bio available"}
                            </p>


                            <div className="profile-section">

                                <h2>Skills I Teach</h2>

                                <p>
                                    {user.teach_skills || "No skills added"}
                                </p>

                            </div>


                            <div className="profile-section">

                                <h2>Skills I Want to Learn</h2>

                                <p>
                                    {user.learn_skills || "No skills added"}
                                </p>

                            </div>


                            {isOwnProfile && (

                                <button
                                    onClick={() => setIsEditing(true)}
                                >
                                    ✏️ Edit Profile
                                </button>

                            )}

                        </>

                    ) : (

                        <form onSubmit={handleSubmit}>

                            <h1>Edit Profile</h1>


                            <div className="profile-form-group">

                                <label>Name</label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>Bio</label>

                                <textarea
                                    value={bio}
                                    onChange={(e) =>
                                        setBio(e.target.value)
                                    }
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>Skills I Teach</label>

                                <input
                                    type="text"
                                    value={teachSkills}
                                    onChange={(e) =>
                                        setTeachSkills(e.target.value)
                                    }
                                    placeholder="Java, React, JavaScript"
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>Skills I Want to Learn</label>

                                <input
                                    type="text"
                                    value={learnSkills}
                                    onChange={(e) =>
                                        setLearnSkills(e.target.value)
                                    }
                                    placeholder="Python, SQL, Node.js"
                                />

                            </div>


                            <div className="profile-form-actions">

                                <button type="submit">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    )}


                    {!isEditing && (

                        <button
                            onClick={() => navigate("/connections")}
                        >
                            Back to Connections
                        </button>

                    )}

                </div>

            </main>
        </>
    );
}

export default Profile;