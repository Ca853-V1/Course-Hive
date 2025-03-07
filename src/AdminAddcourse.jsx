import { useState } from "react";
import { Card, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function AdminAddCourse()
{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImageLink] = useState("");
    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100}}>
            <Card variant="outlined" style={{width: 350, padding: 20, border: "2px solid #42A5F5", borderRadius: 20}}>
                <Typography style={{marginBottom: 10}}><b>Add New Course Details:</b></Typography>
                <TextField style={{marginBottom: 10}} onChange={(v)=>{setTitle(v.target.value)}} fullWidth={true} label="Title" variant="outlined"/>
                <TextField style={{marginBottom: 10}} onChange={(v)=>{setDescription(v.target.value)}} fullWidth={true} label="Description" variant="outlined"/>
                <TextField style={{marginBottom: 10}} onChange={(v)=>{setPrice(v.target.value)}} fullWidth={true} label="Price" variant="outlined"/>
                <TextField style={{marginBottom: 10}} onChange={(v)=>{setImageLink(v.target.value)}} fullWidth={true} label="Image Link" variant="outlined"/>
                <Button size="medium" variant="contained" onClick={async()=>
                {
                    await axios.post("http://localhost:3000/admin/courses",
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
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    alert("Course Added");
                }}>Add Course</Button>
            </Card>
        </div>
    )
}

export default AdminAddCourse;