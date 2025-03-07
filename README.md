# Course Selling Website

## Objective
This project is a full-stack course selling platform where users can browse, purchase, and access courses, while admins can manage the course catalog. It is built using the **MERN (MongoDB, Express, React.js, Node.js) stack**.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Compass
- **Authentication:** JWT & bcrypt (for hashed passwords)

## Features
### Admin
- Signup/Login with authentication.
- Add new courses.
- View all available courses.
- Update course details.

### User
- Signup/Login with authentication.
- Browse available courses.
- Purchase courses.
- View purchased courses.

## Project Structure
```
Course-Selling-Website/
│── server(backend)/
│   ├── db/             # Database models
│   ├── admin_routes/   # Express routes (admin)
│   ├── user_routes/    # Express routes (user)
│   ├── middleware/     # Authentication & validation
│   ├── index.js        # Entry point for backend
│
│── src(frontend)/
│   ├── AdminAddCourse.jsx/         # Add course component for admin
│   ├── AdminCourse.jsx/            # Edit course component for admin
│   ├── AdminCourses.jsx/           # View all courses component for admin
│   ├── Appbar.jsx/                 # Top app bar component
│   ├── Signup.jsx/                 # Signip/login component
│   ├── UserCourses.jsx/            # View all courses component for user
│   ├── UserPurchasedCourses.jsx/   # Purchase courses and view them component for user
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point for frontend
│
│── README.md
│── package.json (Frontend & Backend dependencies)
```

## Installation & Usage
### 1. Clone the repository
```sh
git clone https://github.com/Ca853-V1/Course-Hive.git
cd course-selling-website
npm install  # Install dependencies
```

### 2. Backend Setup
```sh
cd course-selling-website/server
node index.js  # Start backend server
```

### 3. Frontend Setup
```sh
cd course-selling-website
npm run dev  # Start frontend development server on separate terminal
```

### 4. Environment Variables
Create a `.env` file in the `backend` directory with the following:
```
MONGO_URI=<your_mongodb_connection_string> # Change mongoDB cluster with yours
JWT_SECRET=<your_jwt_secret_key>
PORT=3000
```

## Future Scope
- Add payment gateway for course purchases.
- Introduce video streaming for courses.

---

