import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Matches() {

    const matches = [
        {
            id: 1,
            name: "Priya Sharma",
            role: "Frontend Developer",
            teaches: ["React", "JavaScript", "CSS"],
            learns: ["Python", "Django"],
            match: 94,
            avatar: "P"
        },

        {
            id: 2,
            name: "Rohan Verma",
            role: "Backend Developer",
            teaches: ["Python", "Django", "SQL"],
            learns: ["React", "JavaScript"],
            match: 91,
            avatar: "R"
        },

        {
            id: 3,
            name: "Anjali Mehta",
            role: "UI/UX Designer",
            teaches: ["UI/UX", "Figma", "Design"],
            learns: ["HTML", "CSS", "React"],
            match: 87,
            avatar: "A"
        },

        {
            id: 4,
            name: "Arjun Rao",
            role: "Data Analyst",
            teaches: ["Python", "SQL", "Excel"],
            learns: ["JavaScript", "React"],
            match: 82,
            avatar: "A"
        },

        {
            id: 5,
            name: "Sneha Reddy",
            role: "Full Stack Developer",
            teaches: ["Node.js", "Express", "MongoDB"],
            learns: ["Python", "AWS"],
            match: 79,
            avatar: "S"
        },

        {
            id: 6,
            name: "Karthik Kumar",
            role: "Cloud Engineer",
            teaches: ["AWS", "Docker", "Linux"],
            learns: ["React", "Node.js"],
            match: 76,
            avatar: "K"
        }
    ];


    return (
        <>

            <Navbar />

            <main className="matches-page">

                <section className="matches-top">

                    <div>

                        <div className="hero-badge">
                            ✦ DISCOVER PEOPLE
                        </div>

                        <h1>
                            Find Your
                            <span> Skill Match.</span>
                        </h1>

                        <p>
                            Connect with people who can teach
                            what you want to learn and learn
                            from what you already know.
                        </p>

                    </div>


                    <div className="match-search">

                        <span>
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Search skills, people..."
                        />

                    </div>

                </section>


                {/* FILTERS */}

                <section className="match-filters">

                    <button className="filter active">
                        All Matches
                    </button>

                    <button className="filter">
                        Programming
                    </button>

                    <button className="filter">
                        Design
                    </button>

                    <button className="filter">
                        Data
                    </button>

                    <button className="filter">
                        Business
                    </button>

                    <button className="filter">
                        Languages
                    </button>

                </section>


                <div className="results-header">

                    <div>
                        <strong>
                            24 people
                        </strong>

                        <span>
                            {" "}found for you
                        </span>
                    </div>

                    <select>

                        <option>
                            Best Match
                        </option>

                        <option>
                            Most Recent
                        </option>

                        <option>
                            Highest Rated
                        </option>

                    </select>

                </div>


                {/* MATCH CARDS */}

                <section className="match-grid">

                    {matches.map((person) => (

                        <article
                            className="advanced-match-card"
                            key={person.id}
                        >

                            <div className="match-card-top">

                                <div className="large-avatar">
                                    {person.avatar}
                                </div>

                                <div className="match-score">

                                    <strong>
                                        {person.match}%
                                    </strong>

                                    <small>
                                        Match
                                    </small>

                                </div>

                            </div>


                            <h2>
                                {person.name}
                            </h2>

                            <p className="person-role">
                                {person.role}
                            </p>


                            <div className="skill-group">

                                <span className="skill-label">
                                    TEACHES
                                </span>

                                <div className="skill-list">

                                    {person.teaches.map(
                                        (skill) => (

                                            <span
                                                className="match-skill teach-skill"
                                                key={skill}
                                            >
                                                ✦ {skill}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>


                            <div className="skill-group">

                                <span className="skill-label">
                                    WANTS TO LEARN
                                </span>

                                <div className="skill-list">

                                    {person.learns.map(
                                        (skill) => (

                                            <span
                                                className="match-skill learn-skill"
                                                key={skill}
                                            >
                                                ◇ {skill}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>


                            <div className="match-actions">

                                <Link
                                    to={`/profile/${person.id}`}
                                    className="view-profile"
                                >
                                    View Profile
                                </Link>

                                <button className="connect-button">
                                    Connect →
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