import { useState } from "react";
import { singUp } from "./api/AuthAPI";

export default function SingUpPage () {
    const [value, setValues] = useState({
        username: "",
        password: "",
    });

    const handleChange = async (e) => {
        setValues({...setValues, [e.target.id]: e.target.value, 
        });
    }

    const handleSubmit = async (e) => {
        signUp(values)
        .then((response) => {
            window.location.href = `/login`;
        }).catch((error) => {
            console.log(error);
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