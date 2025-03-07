import express, {json} from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import adminRouter from './admin_routes/admin.js';
import userRouter from './user_routes/user.js';

const app=express();

app.use(cors());
app.use(json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

connect('mongodb+srv://{/*mongoDB cluster*/}.mongodb.net/{/*mongoDB database*/}', {});

app.listen(3000,()=>
{
    console.log("Server running on 3000");
})
