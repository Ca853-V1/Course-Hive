import { useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";

function UserCourses()
{
    const [courses, setCourses] = useState([]);
    useEffect(()=>
    {
        axios.get("http://localhost:3000/user/courses/",
        {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        }).then(res=>
            {
                setCourses(res.data.courses);
            });
    }, []);
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map(course=>
            (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    );
}

function CourseCard({ course })
{
    const handlePurchase =()=>
    {
        axios.post(`http://localhost:3000/user/courses/${course._id}`, {},
        {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        }).then(()=>
            {
                alert("Course Purchased Successfully!");
            }).catch(err=>
                {
                    if (err.response && err.response.status === 400)
                    {
                        alert("Course already purchased!");
                    }
                });
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Card variant="outlined" 
                style={{ width: 350, marginRight: 20, padding: 20, border: "2px solid #42A5F5", borderRadius: 20 }}>
                <Typography variant="h6"><b>Title: </b>{course.title}</Typography>
                <Typography variant="subtitle2"><b>Description: </b>{course.description}</Typography>
                <Typography variant="subtitle2"><b>Price: </b>Rs.{course.price}</Typography>
                <img src={course.imageLink} alt="course" style={{ width: 350, marginTop: 10 }} />
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <Button variant="contained" size="medium" onClick={handlePurchase} style={{ marginTop: 10 }}>Purchase Course</Button>
                </div>
            </Card>
        </div>
        );
}

export default UserCourses;
