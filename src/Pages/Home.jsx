import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <main>

                {/* HERO */}

                <section className="hero">

                    <div className="hero-content">

                        <div className="hero-badge">
                            ✦ #1 SKILLS EXCHANGE PLATFORM
                        </div>

                        <h1>
                            Learn.
                            <br />
                            <span>Teach.</span> Exchange.
                        </h1>

                        <p>
                            Connect with people who have the skills
                            you want to learn and exchange knowledge
                            in a meaningful way.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/register"
                                className="primary-btn"
                            >
                                Get Started →
                            </Link>

                            <Link
                                to="/matches"
                                className="secondary-btn"
                            >
                                Explore Skills
                            </Link>

                        </div>

                        <div className="hero-stats">

                            <div>
                                <strong>10K+</strong>
                                <span>Users</span>
                            </div>

                            <div>
                                <strong>25K+</strong>
                                <span>Skills</span>
                            </div>

                            <div>
                                <strong>8K+</strong>
                                <span>Connections</span>
                            </div>

                        </div>

                    </div>


                    {/* KNOWLEDGE SHARING IMAGE */}

                    <div className="knowledge-image">

                        <img
                            src="/knowledge_sharing.png"
                            alt="Two people sharing knowledge"
                        />

                    </div>

                </section>


                {/* SEARCH */}

                <section className="home-search-section">

                    <div className="home-search">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search skills, people, or anything..."
                        />

                        <button>
                            Search
                        </button>

                    </div>

                </section>


                {/* HOW IT WORKS */}

                <section className="how-section">

                    <div className="section-heading">

                        <div className="hero-badge">
                            ✦ HOW IT WORKS
                        </div>

                        <h2>
                            Exchange Skills.
                            <span> Grow Together.</span>
                        </h2>

                        <p>
                            SkillSwap makes it simple to find people,
                            exchange knowledge and build meaningful
                            connections.
                        </p>

                    </div>


                    <div className="steps">

                        <div className="step-card" style={{cursor:"pointer"}}>

                            <div className="step-number">
                                01
                            </div>

                            <h3>
                                Create Your Profile
                            </h3>

                            <p>
                                Tell the community what skills
                                you can teach and what you want
                                to learn.
                            </p>

                        </div>


                        <div className="step-card" style={{cursor:"pointer"}}>

                            <div className="step-number">
                                02
                            </div>

                            <h3>
                                Find Your Match
                            </h3>

                            <p>
                                Discover people whose skills
                                complement your learning goals.
                            </p>

                        </div>


                        <div className="step-card" style={{cursor:"pointer"}}>

                            <div className="step-number">
                                03
                            </div>

                            <h3>
                                Start Exchanging
                            </h3>

                            <p>
                                Connect, share knowledge and
                                learn from each other.
                            </p>

                        </div>

                    </div>

                </section>

            </main>
        </>
    );
}

export default Home;