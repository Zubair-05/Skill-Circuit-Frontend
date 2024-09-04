import {useNavigate} from "react-router-dom";
import axios from "axios";
function SignUp() {
    const navigate = useNavigate()

    const loginWithGoogle = async () => {
        console.log("Login with Google")
        window.location.href = "http://localhost:3000/auth/google";
        // try{
        //     const response = await axios.get('http://localhost:3000/auth/google');
        //     navigate('/courses')
        //     console.log(response)
        // } catch (err){
        //     console.log(err)
        // }
    }

    // const logout = async () => {
    //     console.log("Logout");
    //     try{
    //         const response = await axios.get('http://localhost:3000/logout');
    //         console.log(response)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const handleLogout = async () => {
        await fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include'
        });
        navigate('/login'); // Redirect to login page or wherever appropriate
    };
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
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Choose a username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
                <button
                    className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                    onClick={handleLogout}
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    Logout
                </button>
                <p className="mt-6 text-gray-600 text-center">
                    Already have an account? <span className="text-blue-500 cursor-pointer"
                                                   onClick={() => navigate('/signin')}>Log in</span>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
