import { Card, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function Signup()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const handleAuth = async (endpoint)=>
    {
        try
        {
            const response = await axios.post(`http://localhost:3000/${role}/${endpoint}`,
            {
                username: email,
                password: password
            });
            const data = response.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", role);
            window.location = "/";
        }
        catch (error)
        {
            console.error("Authentication failed", error);
        }
    };
    return (
        <div style={{ paddingTop: 125 }}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
                <Card style={{ width: 300, padding: 20, borderRadius: 20, border: "2px solid #42A5F5" }} variant="outlined">
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Typography style={{marginBottom: 10}}><b>Welcome! Enter Credentials:</b></Typography>
                    </div>
                    <TextField label="Username" fullWidth variant="outlined" style={{ marginBottom: 10 }} onChange={(v) => setEmail(v.target.value)}/>
                    <TextField label="Password" fullWidth variant="outlined" style={{ marginBottom: 10 }} type="password" onChange={(v) => setPassword(v.target.value)}/>
                    <TextField label="Role (admin/user)" fullWidth variant="outlined" style={{ marginBottom: 10 }} onChange={(v) => setRole(v.target.value.toLowerCase())}/>
                    <Button variant="contained" size="medium" onClick={() => handleAuth("signup")}>Sign Up</Button>
                    <Button style={{ marginLeft: 10 }} variant="contained" size="medium" onClick={() => handleAuth("login")}>Login</Button>
                </Card>
            </div>
        </div>
    );
}

export default Signup;