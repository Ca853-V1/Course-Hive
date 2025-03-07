import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Appbar()
{
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    const role = localStorage.getItem("role");
    useEffect(()=>
    {
        const token = localStorage.getItem("token");
        if (!token || !role) return;
        axios.get(`http://localhost:3000/${role}/profile`,
        {
            headers: { "Authorization": "Bearer " + token }
        }).then(res=>
            {
                setUserEmail(res.data.username);
            }).catch(()=>
                {
                    console.error("Error fetching profile");
                });
    }, []);
    if (role === "admin")
    {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 15 }}>
                <Typography variant={"h5"} style={{ fontWeight: 600 , marginLeft: 15}}>Dashboard</Typography>
                <div style={{ display: "flex", paddingRight: 15 }}>
                    <Button style={{marginRight: 5}} variant="outlined" size="medium" onClick={() => navigate("/admin/courses")}>Courses</Button>
                    <Button style={{marginRight: 5}} variant="outlined" size="medium" onClick={() => navigate("/admin/addcourse")}>Add Course</Button>
                    <Box sx={{ border: "1px solid gray", borderRadius: 20, padding: "9px 12px", marginRight: 0.5 }}> <b>ADMIN -</b> {userEmail}</Box>
                    <Button variant="outlined" size="medium" onClick={()=>
                    {
                        localStorage.clear();
                        window.location = "/";
                    }}>Log Out</Button>
                </div>
            </div>
        );
    }
    if (role === "user")
    {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 15 }}>
                <Typography variant={"h5"} style={{ fontWeight: 600 , marginLeft: 15}}>Dashboard</Typography>
                <div style={{ display: "flex", paddingRight: 15 }}>
                    <Button style={{marginRight: 5}} variant="outlined" size="medium" onClick={() => navigate("/user/courses")}>Courses available</Button>
                    <Button style={{marginRight: 5}} variant="outlined" size="medium" onClick={() => navigate("/user/purchasedCourses")}>Courses purchased</Button>
                    <Box sx={{ border: "1px solid gray", borderRadius: 20, padding: "9px 12px", marginRight: 0.5 }}> <b>USER -</b> {userEmail}</Box>
                    <Button variant="outlined" size="medium" onClick={()=>
                    {
                        localStorage.clear();
                        window.location = "/";
                    }}>Log Out</Button>
                </div>
            </div>
        );
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 15 }}>
            <Typography variant={"h6"} style={{ fontWeight: 600 , marginLeft: 15}}>Course Selling Website</Typography>
            <Button style={{ marginRight: 15}} variant="outlined" size="medium" onClick={() => navigate("/signup")}>Sign up</Button>
        </div>
    );
}

export default Appbar;
