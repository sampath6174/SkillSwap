import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(email)
        // console.log(password);
        const response = await fetch("http://localhost:3000/login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                email,password
            })
        });
        const data = await response.json()
        if (data.message === "Login successful") {
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
}else{
        alert(`${data.message}`)
        
        }

        
    }

    return (
        <main className="auth-page">

            <div className="auth-container">

                <div className="auth-info">

                    <div className="hero-badge">
                        ✦ WELCOME BACK
                    </div>

                    <h1>
                        Welcome
                        <span> Back.</span>
                    </h1>

                    <p>
                        Continue your journey of learning,
                        teaching and connecting.
                    </p>

                    <div className="auth-points">

                        <div>
                            <span>✦</span>
                            Discover new skills
                        </div>

                        <div>
                            <span>✦</span>
                            Connect with learners
                        </div>

                        <div>
                            <span>✦</span>
                            Continue your skill journey
                        </div>

                    </div>

                </div>


                <div className="auth-card">

                    <h2>
                        Login
                    </h2>

                    <p>
                        Enter your account details
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                        />


                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                        />


                        <div className="forgot">
                            Forgot password?
                        </div>


                        <button
                            type="submit"
                            className="auth-button"
                        >
                            Login →
                        </button>

                    </form>


                    <p className="auth-bottom">
                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}

export default Login;