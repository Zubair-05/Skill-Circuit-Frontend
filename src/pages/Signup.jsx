import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {postApiCall} from "@/utils/apiHelper.js";

function SignUp() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(`making a signup request`);
        try{
            const url = process.env.BASE_URL + `/auth/signup`;
            const response = await axios.post(url, {
                email: email,
                password: password,
                name: name,
            },{
                withCredentials: true,
            })
            navigate('/')
            console.log(response)
        } catch (err){
            console.log(err);
        }
    }

    const loginWithGoogle = async () => {
        console.log("Login with Google")
        window.location.href = `${process.env.BASE_URL}/auth/google`;
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Choose a username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={(e) => handleSignUp(e)}
                    >
                        Sign Up
                    </button>
                </form>
                <div className="my-6 text-center text-gray-600">Or sign up with</div>
                <button
                    className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                    onClick={loginWithGoogle}
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    Sign up with Google
                </button>

                <p className="mt-6 text-gray-600 text-center">
                    Already have an account?
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate('/signin')}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
