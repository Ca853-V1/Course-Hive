import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Typography, TextField } from "@mui/material";
import { keyframes } from "@mui/system";

function AdminCourse()
{
    let {courseId} = useParams();
    console.log(courseId);
    const [course, setCourse] = useState(null);
    useEffect(()=>
    {
        axios.get("http://localhost:3000/admin/courses/" + courseId,
        {
            headers:
            {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>
            {
                setCourse(res.data.course);
            });
    },[]);
    if(!course)
    {
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading...
        </div>
    }
    return (
        <div>
            <GreyTopper title={course.title}/>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 250px)", position: "relative" }}>
                <UpdateCard course={course} setCourse={setCourse}/>
                <div style={{ position: "absolute", right: "4%", top: "20.5%", transform: "translateY(-50%)" }}>
                    <Course_card course={course} />
                </div>
            </div>
        </div>
    );
}

function GreyTopper({title})
{
    const fadeAnimation = keyframes`
                            0% { color: white; }
                            50% { color: #00BFFF; } 
                            100% { color: cyan; }
                            `;
    return(
        <div style={{height: 230, background: "#212121", width: "100vw", zIndex: 0, marginBottom: -50}}>
            <div style={{height: 230, display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <div>
                    <Typography sx={{ fontWeight: 600, animation: `${fadeAnimation} 2s infinite`}} variant="h3" textAlign={"center"}> {title} </Typography>
                </div>
            </div>
        </div>);
}

function Course_card({course})
{
    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 50 ,marginBottom: 250}}>
            <Card variant="outlined" style={{zIndex:2, width: 350, marginRight: 20, border: "2px solid #42A5F5", borderRadius: 20}}>
                <img src={course.imageLink} style={{width: 350}}></img>
                <div style={{marginLeft:10}}>
                    <Typography variant="h6"><b>{course.title}</b></Typography>
                    <Typography variant="subtitle1" style={{color: "gray"}}>Price</Typography>
                    <Typography variant="subtitle1"><b>Rs. {course.price}</b></Typography>
                </div>
            </Card>
        </div>);
}

function UpdateCard({course, setCourse})
{
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);
    const [image, setImageLink] = useState(course.imageLink);
    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 40}}>
            <Card variant="outlined" style={{width: 500, padding: 20, border: "2px solid #42A5F5", borderRadius: 20}}>
                <Typography style={{marginBottom: 10, marginTop: -8}}><b>Update Course Details:</b></Typography>
                <TextField value={title} style={{marginBottom: 10}} onChange={(v)=>{setTitle(v.target.value)}} fullWidth={true} label="Title" variant="outlined"/>
                <TextField value={description} style={{marginBottom: 10}} onChange={(v)=>{setDescription(v.target.value)}} fullWidth={true} label="Description" variant="outlined"/>
                <TextField value={price} style={{marginBottom: 10}} onChange={(v)=>{setPrice(v.target.value)}} fullWidth={true} label="Price" variant="outlined"/>
                <TextField value={image} style={{marginBottom: 10}} onChange={(v)=>{setImageLink(v.target.value)}} fullWidth={true} label="Image Link" variant="outlined"/>
                <Button size="medium" variant="contained"
                    onClick={async()=>{
                        axios.put("http://localhost:3000/admin/courses/" + course._id,
                        {
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true,
                            price: price
                        },
                        {
                            headers:
                            {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        let updatedCourse =
                        {
                            _id: course._id,
                            title: title,
                            description: description,
                            imageLink: image,
                            price: price
                        };
                        setCourse(updatedCourse);
                    }}>Update Course</Button>
            </Card>
        </div>
    )
}

export default AdminCourse;