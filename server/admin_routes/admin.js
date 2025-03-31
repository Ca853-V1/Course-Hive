import { Router } from "express";
import db from "../db/index.js";
import pkg from 'jsonwebtoken';
import auth from "../middleware/admin_auth.js";
import bcrypt from 'bcrypt';
import { z } from "zod";

const { Course, Admin } = db;
const { adminKey, adminAuthenticateJwt } = auth;
const router = Router();

router.get('/profile', adminAuthenticateJwt, async(req, res)=>
{
    const { username } = req.user;
    const admin = await Admin.findOne({ username });
    if (!admin)
    {
        return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ username: admin.username, role: "admin" });
});

const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(12)
});

router.post('/signup', async(req, res)=>
{
    const parsedInput = signupInput.safeParse(req.body);
    if(!parsedInput.success)
    {
        res.status(411).json({error: parsedInput.error});
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const adminExists = await Admin.findOne({ username });
    if (adminExists)
    {
        return res.status(403).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    const token = pkg.sign({ username, role: 'admin' }, adminKey, { expiresIn: '1h' });
    res.json({ message: "Admin created successfully", token });
});

router.post('/login', async(req, res)=>
{
    const parsedInput = signupInput.safeParse(req.body);
    if(!parsedInput.success)
    {
        res.status(411).json({error: parsedInput.error});
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const admin = await Admin.findOne({ username });
    if (!admin)
    {
        return res.status(404).json({ message: "Invalid login credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
    {
        return res.status(401).json({ message: "Invalid login credentials" });
    }
    const token = pkg.sign({ username, role: 'admin' }, adminKey, { expiresIn: '1h' });
    res.json({ message: "Logged In successfully", token });
});

router.post('/courses', adminAuthenticateJwt, async(req, res)=>
{
    const course = new Course(req.body);
    await course.save();
    res.json({message: "Course added successfully"});
});

router.put('/courses/:courseId', adminAuthenticateJwt, async(req, res)=>
{
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true});
    if(course)
    {
        res.json({message: "Course updated successfully"});
    }
    else
    {
        res.status(404).json({message: "Course not found"});
    }
});

router.get('/courses', adminAuthenticateJwt, async(req, res)=>
{
    const courses = await Course.find({});
    res.json({courses});
});

router.get('/courses/:courseId', adminAuthenticateJwt, async(req, res)=>
{
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({course});
});

router.delete('/courses/:courseId', adminAuthenticateJwt, async (req, res) =>
{
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if(course)
    {
        res.json({ message: "Course deleted successfully" });
    }
    else
    {
        res.status(404).json({ message: "Course not found" });
    }
});


export default router;