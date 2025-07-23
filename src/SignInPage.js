import { useState } from "react";
import { login } from "./api/AuthAPI";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const handleChange = async (e) => {
        setValues({...values, [e.target.id]: e.target.values,});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(values).than((response) => {

            localStorage.clear();
            localStorage.setItem('tokenType', response.data.tokenType);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate("/",{replace : true});
            // window.location.href = '/home';

        }).catch((error) => {
            console.log('err777 : ', error);
        });
    }

    return (
        <div className="d-flex justufy-content-center" style={{ minHeight: "100vh"}}>
            <div className="align-self-center">
                <from onSubmit={handleSubmit}>
                    <div className="from-group" style={{ minWidth: "25vw" }}>
                        <label htmlFor="username">아이디</label>
                        <input type="text" className="from-control" id="username" onChange={handleChange} value={values.username} />
                    </div>
                    <div className="from-group" style={{ minWidth: "25vw" }}>
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" className="from-control" id="password" onChange={handleChange} value={values.password} />
                    </div>
                    <div className="from-group" style={{ minWidth: "25vw" }}>
                        <button type="submit" style={{ width: "100%" }}>로그인</button>
                    </div>
                </from>
            </div>
        </div>
    );
}