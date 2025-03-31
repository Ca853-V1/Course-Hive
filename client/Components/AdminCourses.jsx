import { useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCourses()
{
    const [courses, setCourses] = useState([]);
    useEffect(()=>
    {
        axios.get("http://localhost:3000/admin/courses/",
        {
            headers:
            {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>
            {
                setCourses(res.data.courses);
            });
    }, []);
    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {courses.map(course=>
            {
                return <Course_card course={course} setCourses={setCourses} />
            })}
        </div>
    );
}

function Course_card({course, setCourses})
{
    const navigate = useNavigate();
    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Card variant="outlined" style={{width: 350, marginRight: 20, padding: 20, border: "2px solid #42A5F5", borderRadius: 20}}>
                <Typography style={{marginTop: -10}} variant="h6"><b>Title: </b>{course.title}</Typography>
                <Typography variant="subtitle2"><b>Description: </b>{course.description}</Typography>
                <img src={course.imageLink} style={{width: 350, marginTop: 10}}></img>
                <Button variant="contained" size="medium" style={{marginTop: 10, width: 100}} onClick={()=>
                {
                    navigate("/admin/course/"+course._id);
                }}>Edit</Button>
                <Button variant="contained" size="medium" style={{ marginTop: 10, marginLeft: 10, width: 100 }} onClick={async()=>
                {
                    const response = await fetch(`http://localhost:3000/admin/courses/${course._id}`,
                    {
                        method: "DELETE",
                        headers:
                        {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        }
                    });
                    if(response.ok)
                    {
                        alert("Course deleted successfully");
                        setCourses(prevCourses => prevCourses.filter(c => c._id !== course._id));
                    }
                    else
                    {
                        alert("Failed to delete course");
                    }
                }}>Delete</Button>
            </Card>
        </div>);
}

export default AdminCourses;