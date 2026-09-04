import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {

    const { id } = useParams();


    const people = {
        1: {
            name: "Priya Sharma",
            role: "Frontend Developer",
            location: "Bengaluru, India",
            avatar: "P",
            match: 94,
            about:
                "Frontend developer passionate about creating modern and responsive web applications. I enjoy helping people understand React and JavaScript through practical projects.",
            teaches: [
                "React",
                "JavaScript",
                "CSS",
                "HTML"
            ],
            learns: [
                "Python",
                "Django",
                "Backend Development"
            ]
        },

        2: {
            name: "Rohan Verma",
            role: "Backend Developer",
            location: "Hyderabad, India",
            avatar: "R",
            match: 91,
            about:
                "Backend developer focused on Python, APIs and databases. Looking to exchange backend knowledge with frontend developers.",
            teaches: [
                "Python",
                "Django",
                "SQL",
                "REST APIs"
            ],
            learns: [
                "React",
                "JavaScript",
                "Frontend Development"
            ]
        },

        3: {
            name: "Anjali Mehta",
            role: "UI/UX Designer",
            location: "Mumbai, India",
            avatar: "A",
            match: 87,
            about:
                "UI/UX designer who loves creating clean interfaces and meaningful user experiences. I enjoy collaborating with developers.",
            teaches: [
                "UI/UX",
                "Figma",
                "Wireframing",
                "Design"
            ],
            learns: [
                "HTML",
                "CSS",
                "React"
            ]
        },

        4: {
            name: "Arjun Rao",
            role: "Data Analyst",
            location: "Chennai, India",
            avatar: "A",
            match: 82,
            about:
                "Data analyst interested in turning data into useful insights. I enjoy learning modern web development.",
            teaches: [
                "Python",
                "SQL",
                "Excel",
                "Data Analysis"
            ],
            learns: [
                "JavaScript",
                "React",
                "Node.js"
            ]
        },

        5: {
            name: "Sneha Reddy",
            role: "Full Stack Developer",
            location: "Hyderabad, India",
            avatar: "S",
            match: 79,
            about:
                "Full stack developer interested in building scalable applications and learning cloud technologies.",
            teaches: [
                "Node.js",
                "Express",
                "MongoDB",
                "JavaScript"
            ],
            learns: [
                "Python",
                "AWS",
                "Docker"
            ]
        },

        6: {
            name: "Karthik Kumar",
            role: "Cloud Engineer",
            location: "Pune, India",
            avatar: "K",
            match: 76,
            about:
                "Cloud engineer passionate about AWS, Linux and DevOps. Always interested in exchanging knowledge with developers.",
            teaches: [
                "AWS",
                "Docker",
                "Linux",
                "DevOps"
            ],
            learns: [
                "React",
                "Node.js",
                "JavaScript"
            ]
        }
    };


    const person = people[id] || people[1];


    return (
        <>

            <Navbar />

            <main className="profile-page">

                <Link
                    to="/matches"
                    className="back-link"
                >
                    ← Back to Matches
                </Link>


                {/* PROFILE HERO */}

                <section className="profile-hero">

                    <div className="profile-main">

                        <div className="profile-large-avatar">
                            {person.avatar}
                        </div>


                        <div>

                            <div className="hero-badge">
                                ✦ SKILL MATCH
                            </div>

                            <h1>
                                {person.name}
                            </h1>

                            <p className="profile-role">
                                {person.role}
                            </p>

                            <p className="profile-location">
                                ◉ {person.location}
                            </p>

                        </div>

                    </div>


                    <div className="profile-match">

                        <span>
                            MATCH
                        </span>

                        <strong>
                            {person.match}%
                        </strong>

                        <small>
                            Great compatibility
                        </small>

                    </div>

                </section>


                {/* PROFILE CONTENT */}

                <section className="profile-layout">


                    {/* LEFT */}

                    <div className="profile-left">

                        <div className="profile-panel">

                            <span className="small-label">
                                ABOUT
                            </span>

                            <h2>
                                About {person.name.split(" ")[0]}
                            </h2>

                            <p>
                                {person.about}
                            </p>

                        </div>


                        <div className="profile-panel">

                            <span className="small-label">
                                ✦ CAN TEACH
                            </span>

                            <h2>
                                Skills I Can Share
                            </h2>

                            <div className="profile-skills">

                                {person.teaches.map(
                                    (skill) => (

                                        <span
                                            className="profile-skill teach-profile"
                                            key={skill}
                                        >
                                            ✦ {skill}
                                        </span>

                                    )
                                )}

                            </div>

                        </div>


                        <div className="profile-panel">

                            <span className="small-label">
                                ◇ WANTS TO LEARN
                            </span>

                            <h2>
                                Skills I Want
                            </h2>

                            <div className="profile-skills">

                                {person.learns.map(
                                    (skill) => (

                                        <span
                                            className="profile-skill learn-profile"
                                            key={skill}
                                        >
                                            ◇ {skill}
                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* RIGHT */}

                    <aside className="profile-sidebar">

                        <div className="connect-card">

                            <div className="connect-icon">
                                ✦
                            </div>

                            <h2>
                                Start a Skill Swap
                            </h2>

                            <p>
                                You can teach each other valuable
                                skills. Send a connection request
                                and start learning together.
                            </p>

                            <button className="profile-connect">
                                Connect with {person.name.split(" ")[0]} →
                            </button>

                        </div>


                        <div className="compatibility-card">

                            <span>
                                COMPATIBILITY
                            </span>

                            <div className="compatibility-number">
                                {person.match}%
                            </div>

                            <div className="progress-bar">

                                <div
                                    style={{
                                        width: `${person.match}%`
                                    }}
                                ></div>

                            </div>

                            <p>
                                Your skills align strongly with
                                this person's learning goals.
                            </p>

                        </div>

                    </aside>

                </section>

            </main>

        </>
    );
}

export default Profile;