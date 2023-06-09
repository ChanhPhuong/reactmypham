import { Input, Button, Form } from "antd";
import './Login.scss';
import { useEffect, useState } from "react";
import { loginAip } from "../service/UserService";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Link from "antd/es/typography/Link";
const Login = () => {

    const { loginContext } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loadingAPI, setLoadingAPI] = useState(false);

    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if (token) {
    //         navigate("/");
    //     }
    // }, [])
    const handleGoBack = () => {
        navigate("/");
    }
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required")
            return;

        }
        setLoadingAPI(true);

        let res = await loginAip(email.trim(), password);

        if (res && res.token) {
            loginContext(email, res.token);
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingAPI(false);

    }
    const handlePressEnter = async (event) => {
        if (event && event.key === 'Enter') {
            await handleLogin();
        }
    }
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <label className="text"> Email or username(eve.holt@reqres.in)</label>

                <Form className="loginForm">
                    <Form.Item className="mb-3" name="username">

                        <Input className="email-user" placeholder="Email or username"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item className="mb-3" name="password">
                        <div className="input-2">
                            <Input type={isShowPassword === true ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyDown={(event) => handlePressEnter(event)}
                            ></Input>
                            <i class={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                onClick={() => setIsShowPassword(!isShowPassword)}

                            >
                            </i>
                        </div>
                    </Form.Item>
                    <Form.Item className="mb-3">
                        <Button
                            className={email && password ? "active" : ""}
                            disabled={email && password ? false : true}
                            onClick={() => handleLogin()}
                            block >
                            {loadingAPI && <i class="fas fa-sync fa-spin"></i>}
                            &nbsp; Login
                        </Button>
                    </Form.Item>
                </Form>
                <div className="back">
                    <Link to='/'></Link>
                    <i class="fa-solid fa-chevron-left"></i> <span onClick={() => handleGoBack()}> &nbsp; Go back </span>
                </div>
            </div>

        </>
    )
}

export default Login;