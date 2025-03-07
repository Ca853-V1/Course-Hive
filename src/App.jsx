import Appbar from "./Appbar";
import Signup from"./Signup";
import AdminCourses from "./AdminCourses";
import AdminAddCourse from "./AdminAddcourse";
import AdminCourse from "./AdminCourse";
import UserCourses from "./UserCourses";
import UserPurchasedCourses from "./UserPurchasedCourses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App()
{
  return (
    <div style={{backgroundColor: "#E3F2FD", width: "100vw", minHeight: "100vh"}}>
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

