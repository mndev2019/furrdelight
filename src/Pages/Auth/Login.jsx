import { useState, useEffect } from 'react';
import { FaPaw, FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from "../../assets/Image/logo.svg"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [pawAnimation, setPawAnimation] = useState(false);

    useEffect(() => {
        // Trigger paw animation every 5 seconds
        const interval = setInterval(() => {
            setPawAnimation(true);
            setTimeout(() => setPawAnimation(false), 1000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ email, password, rememberMe });
    };

    return (
        <div className="min-h-screen bg-[#DEF0FF] flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#001B48]/10">
                    {/* Header */}
                    <div className="bg-[#001B48] p-6 text-center relative overflow-hidden">
                        <motion.div
                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#001B48]/20"
                            animate={{ scale: [1, 1.5], opacity: [0, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        />

                        <motion.div
                            animate={{
                                rotate: pawAnimation ? [0, 15, -15, 0] : 0,
                                scale: pawAnimation ? [1, 1.2, 1] : 1
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex justify-center mb-4">
                                <img src={logo} alt="" style={{ width: "140px" }} />
                            </div>
                        </motion.div>


                        <motion.p
                            className="text-[#DEF0FF] mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Welcome back! Please login to your account
                        </motion.p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-[#001B48] mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001B48] focus:border-[#001B48] transition-all duration-200"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label htmlFor="password" className="block text-sm font-medium text-[#001B48] mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001B48] focus:border-[#001B48] transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                                    ) : (
                                        <FaEye className="text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-[#001B48] focus:ring-[#001B48] border-gray-300 rounded transition-colors duration-200"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#001B48]">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-[#001B48] hover:text-[#001B48]/80 transition-colors duration-200">
                                    Forgot password?
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#001B48] hover:bg-[#001B48]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001B48] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Sign in
                            </button>
                        </motion.div>
                    </form>

                    {/* Footer */}
                    <motion.div
                        className="px-6 py-4 bg-[#DEF0FF] text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="text-sm text-[#001B48]">
                            Don't have an account?{' '}
                            <a href="#" className="font-medium text-[#001B48] hover:text-[#001B48]/80 transition-colors duration-200">
                                Sign up
                            </a>
                        </p>
                    </motion.div>
                </div>



            </motion.div>
        </div>
    );
};

export default Login;