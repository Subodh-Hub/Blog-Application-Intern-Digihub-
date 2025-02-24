import useLoginForm from '../components/hooks/useLoginForm'
import character from '@/assets/images/logo/character.png'
import cactus from '@/assets/images/logo/cactus.png'
import '@/assets/styles/login.css'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Eye, EyeClosed, Loader2 } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'

const Login = () => {
    const { formik, loading } = useLoginForm()
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field],
        })
    }
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-custom-gradient dark:bg-custom-gradient">
            <div className="form-container">
                <div className="form-details">
                    <div className="form-header">
                        <h1>Logo Here</h1>
                        <p className="dark:text-black">
                            Blogging site developed during intern!!!!
                        </p>
                        <h3>Log In</h3>
                    </div>
                    <div className="form-content">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-component">
                                <label
                                    htmlFor="email"
                                    className="dark:text-black"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <p className="text-sm text-red-500">
                                        {formik.errors.email}
                                    </p>
                                ) : null}
                            </div>
                            <div className="relative form-component">
                                <label
                                    htmlFor="password"
                                    className="dark:text-black"
                                >
                                    Password
                                </label>
                                <input
                                    type={showPassword.password ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePassword('password')}
                                    className="absolute z-50 text-black right-3 top-12"
                                >
                                    {showPassword.password ? (
                                        <EyeClosed size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <p className="text-sm text-red-500">
                                        {formik.errors.password}
                                    </p>
                                ) : null}
                            </div>

                            <Button className="btn-submit" type="submit">
                                login{' '}
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <FaAngleRight />
                                )}
                            </Button>
                        </form>
                    </div>
                    <div className="form-footer">
                        <p className="dark:text-black">
                            Need an account? <Link to="/signup">Sign Up</Link>
                        </p>
                        <p className="dark:text-black">
                            Go back to <Link to="/">Home</Link>
                        </p>
                    </div>
                </div>
                <div className="side-container">
                    <img src={character} alt="" className="character-img" />
                    <img src={cactus} alt="" className="cactus-img" />
                </div>
            </div>
            <ToastContainer position="top-center" />
        </div>
    )
}

export default Login
