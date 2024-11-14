import React, { useState, useContext } from "react";
import { LoginContext } from "../../components/LoginContext";
import { MerchantContext } from "../../components/MerchantContext";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setLogin } = useContext(LoginContext);
    const { setMerchant } = useContext(MerchantContext);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        if (username === "user" && password === "password") {
            setLogin(true);
                        
        } else if (username === "admin" && password === "admin") {
          setMerchant(true);
          setLogin(true);
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Password"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 my-4 rounded-full transition-all capitalize whitespace-nowrap cursor-pointer">Login</button>
                    New to website? <a className="text-emerald-500 cursor-pointer" onClick={()=>window.location.href='/register'}>Register here</a>
                </form>
            </div>
        </div>
    );
};
