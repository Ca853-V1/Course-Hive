import {Schema, model} from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
    purchasedCourse: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});
const adminSchema = new Schema({
    username: String,
    password: String
});
const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});
const User = model('User', userSchema);
const Admin = model('Admin', adminSchema);
const Course = model('Course', CourseSchema);

export default
{
    User, Admin, Course
}