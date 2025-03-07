import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import axios from "axios";

function UserPurchasedCourses()
{
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    useEffect(()=>
    {
        axios.get("http://localhost:3000/user/purchasedCourses",
        {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        }).then(res=>
            {
                setPurchasedCourses(res.data.purchasedCourse);
            });
    }, []);
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {(purchasedCourses.length > 0) ? (purchasedCourses.map(course => <Course_card key={course._id} course={course} />)) : (<Typography variant="h6">No purchased courses found</Typography>)}
        </div>
    );
}

function Course_card({ course }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Card variant="outlined" style={{ width: 350, marginRight: 20, padding: 20, border: "2px solid #42A5F5", borderRadius: 20 }}>
                <Typography variant="h6"><b>Title: </b>{course.title}</Typography>
                <Typography variant="subtitle2"><b>Description: </b>{course.description}</Typography>
                <img src={course.imageLink} alt={course.title} style={{ width: 350, marginTop: 10 }} />
            </Card>
        </div>
    );
}

export default UserPurchasedCourses;
