import { Router } from "express";
import db from "../db/index.js";
import pkg from 'jsonwebtoken';
import auth from "../middleware/user_auth.js";
import bcrypt from 'bcrypt';

const { Course, User } = db;
const {userKey, userAuthenticateJwt} = auth;
const router = Router();

router.get('/profile', userAuthenticateJwt, async(req,res)=>
{
    const { username } = req.user;
    const user = await User.findOne({ username });
    if (!user)
    {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username, role: "user" });
});

router.post('/signup', async(req, res)=>
{
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
    {
        return res.status(403).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = pkg.sign({ username, role: 'user' }, userKey, { expiresIn: '1h' });
    res.json({ message: "User created successfully", token });
});

router.post('/login', async(req, res)=>
{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
    {
        return res.status(404).json({ message: "Invalid login credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
    {
        return res.status(403).json({ message: "Invalid login credentials" });
    }
    const token = pkg.sign({ username, role: 'user' }, userKey, { expiresIn: '1h' });
    res.json({ message: "User logged in successfully", token });
});

router.get('/courses', userAuthenticateJwt, async(req, res)=>
{
    const courses = await Course.find({published: "true"});
    res.json({courses});
});

router.post('/courses/:courseId', userAuthenticateJwt, async(req, res)=>
{
    const course = await Course.findById(req.params.courseId);
    if (!course)
    {
        return res.status(404).json({ message: "Course not found" });
    }
    const user = await User.findOne({ username: req.user.username });
    if (!user)
    {
        return res.status(403).json({ message: "User not found" });
    }
    if (user.purchasedCourse.includes(course._id))
    {
        return res.status(400).json({ message: "Course already purchased" });
    }
    user.purchasedCourse.push(course._id);
    await user.save();
    res.json({ message: "Course purchased successfully" });
});

router.get('/purchasedCourses', userAuthenticateJwt, async(req, res)=>
{
    const user = await User.findOne({username: req.user.username}).populate('purchasedCourse');
    if(user)
    {
        res.json({purchasedCourse: user.purchasedCourse || []});
    }
    else
    {
        res.status(401).json({message: "User not found"});
    }
});

export default router;