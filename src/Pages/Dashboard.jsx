import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {

    return (
        <>

            <Navbar />

            <main className="dashboard-page">

                <aside className="dashboard-sidebar">

                    <div className="profile-mini">

                        <div className="profile-avatar">
                            S
                        </div>

                        <h3>
                            Sampath
                        </h3>

                        <p>
                            Hyderabad, India
                        </p>

                    </div>


                    <div className="side-menu">

                        <Link className="side-active" to="/dashboard">
                            ◈ Dashboard
                        </Link>

                        <Link to="/matches">
                            ⌕ Find Matches
                        </Link>

                        <Link to="/profile/1">
                            ◯ My Profile
                        </Link>

                        <a href="#">
                            ⚙ Settings
                        </a>

                    </div>

                </aside>


                <section className="dashboard-content">

                    <div className="dashboard-header">

                        <div>

                            <span className="small-label">
                                DASHBOARD
                            </span>

                            <h1>
                                Welcome back,
                                <span> Sampath.</span>
                            </h1>

                            <p>
                                Here's what's happening with your
                                SkillSwap journey.
                            </p>

                        </div>

                        <Link
                            to="/matches"
                            className="dashboard-action"
                        >
                            Find Matches →
                        </Link>

                    </div>


                    {/* STATS */}

                    <div className="dashboard-stats">

                        <div className="stat-card">
                            <span>SKILLS ADDED</span>
                            <strong>8</strong>
                            <small>↑ 2 this month</small>
                        </div>

                        <div className="stat-card">
                            <span>MATCHES FOUND</span>
                            <strong>24</strong>
                            <small>↑ 8 this week</small>
                        </div>

                        <div className="stat-card">
                            <span>CONNECTIONS</span>
                            <strong>12</strong>
                            <small>↑ 3 this month</small>
                        </div>

                        <div className="stat-card">
                            <span>SKILL SWAPS</span>
                            <strong>6</strong>
                            <small>2 active</small>
                        </div>

                    </div>


                    <div className="dashboard-grid">


                        {/* TEACH */}

                        <div className="dashboard-panel">

                            <div className="panel-heading">

                                <div>
                                    <span>
                                        ✦ TEACH
                                    </span>

                                    <h2>
                                        Skills I Can Teach
                                    </h2>
                                </div>

                                <button>
                                    +
                                </button>

                            </div>


                            <div className="dashboard-skills">

                                <span>React</span>
                                <span>JavaScript</span>
                                <span>HTML</span>
                                <span>CSS</span>
                                <span>Git</span>
                                <span>SQL</span>

                            </div>

                        </div>


                        {/* LEARN */}

                        <div className="dashboard-panel">

                            <div className="panel-heading">

                                <div>
                                    <span>
                                        ◇ LEARN
                                    </span>

                                    <h2>
                                        Skills I Want
                                    </h2>
                                </div>

                                <button>
                                    +
                                </button>

                            </div>


                            <div className="dashboard-skills">

                                <span>Python</span>
                                <span>Django</span>
                                <span>Node.js</span>
                                <span>AWS</span>
                                <span>Docker</span>

                            </div>

                        </div>

                    </div>


                    {/* RECENT MATCHES */}

                    <div className="recent-panel">

                        <div className="panel-heading">

                            <div>

                                <span>
                                    ✦ RECENT
                                </span>

                                <h2>
                                    Recent Matches
                                </h2>

                            </div>

                            <Link to="/matches">
                                View all →
                            </Link>

                        </div>


                        <div className="recent-list">

                            <div className="recent-person">

                                <div className="small-avatar">
                                    P
                                </div>

                                <div>
                                    <strong>
                                        Priya Sharma
                                    </strong>

                                    <span>
                                        React · JavaScript
                                    </span>
                                </div>

                                <div className="recent-match">
                                    94%
                                </div>

                                <button>
                                    Connect
                                </button>

                            </div>


                            <div className="recent-person">

                                <div className="small-avatar">
                                    R
                                </div>

                                <div>
                                    <strong>
                                        Rohan Verma
                                    </strong>

                                    <span>
                                        Python · Django
                                    </span>
                                </div>

                                <div className="recent-match">
                                    91%
                                </div>

                                <button>
                                    Connect
                                </button>

                            </div>


                            <div className="recent-person">

                                <div className="small-avatar">
                                    A
                                </div>

                                <div>
                                    <strong>
                                        Anjali Mehta
                                    </strong>

                                    <span>
                                        UI/UX · Figma
                                    </span>
                                </div>

                                <div className="recent-match">
                                    87%
                                </div>

                                <button>
                                    Connect
                                </button>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </>
    );
}

export default Dashboard;