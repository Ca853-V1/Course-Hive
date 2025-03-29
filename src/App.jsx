import Appbar from "./Components/Appbar";
import Signup from"./Components/Signup";
import AdminCourses from "./Components/AdminCourses";
import AdminAddCourse from "./Components/AdminAddcourse";
import AdminCourse from "./Components/AdminCourse";
import UserCourses from "./Components/UserCourses";
import UserPurchasedCourses from "./Components/UserPurchasedCourses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App()
{
  return (
    <div style={{background: "linear-gradient(to left, #ede7f6, #d1c4e9)", width: "100vw", minHeight: "100vh"}}>
      <Router>
        <Appbar/>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/admin/addcourse" element={<AdminAddCourse/>}/>
            <Route path="/admin/courses" element={<AdminCourses/>}/>
            <Route path="/admin/course/:courseId" element={<AdminCourse/>}/>
            <Route path="/user/courses" element={<UserCourses/>}/>
            <Route path="/user/purchasedCourses" element={<UserPurchasedCourses/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App;

