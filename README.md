# Course Selling Website -

## Objective:
This project is a full-stack course selling platform where users can browse and purchase courses, while admins can manage the course catalog. It is built using the **MERN (MongoDB, Express, React.js, Node.js) stack**.

## Tech Stack:
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Compass
- **Authentication:** JWT & bcrypt (for hashed passwords)

## Features:
### Admin:
- Signup/Login with authentication.
- Add new courses.
- View all available courses.
- Update course details.

### User:
- Signup/Login with authentication.
- Browse available courses.
- Purchase courses.
- View purchased courses.

## Project Structure:
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

## Installation & Usage:
### 1) Clone the repository:
```sh
git clone https://github.com/Ca853-V1/Course-Hive.git
cd course-selling-website
npm install  # Install dependencies
```

### 2) Backend Setup:
```sh
cd course-selling-website/server
node index.js  # Start backend server
```

### 3) Frontend Setup:
```sh
cd course-selling-website
npm run dev  # Start frontend development server on separate terminal
```

### 4) Environment Variables:
Create a `.env` file in the `backend` directory with the following:
```
MONGO_URI=<your_mongodb_connection_string> # Change mongoDB cluster with yours
JWT_SECRET=<your_jwt_secret_key> # Change secret key
PORT=3000
```

## Future Scope:
- Add payment gateway for course purchases.
- Introduce video streaming for courses or to interact between user and admin.

---

![Screenshot (64)](https://github.com/user-attachments/assets/19664327-5c6a-47bb-aa49-6819796582aa)
![Screenshot (68)](https://github.com/user-attachments/assets/cdb15dca-bdf5-43d6-b639-bfe4f3aaaa7b)
![Screenshot (69)](https://github.com/user-attachments/assets/ea867371-2214-489e-bb9d-b0a946476075)
![Screenshot (70)](https://github.com/user-attachments/assets/f357517d-b71a-4b2d-8fe1-a857d1f8ae31)
![Screenshot (71)](https://github.com/user-attachments/assets/c6fdf263-c818-4069-a5f3-b7000eb4cdc5)
![Screenshot (73)](https://github.com/user-attachments/assets/ad3adcd1-9feb-4095-ad06-ecd069c45d89)
![Screenshot (74)](https://github.com/user-attachments/assets/99a9a18b-91ac-48d4-b4df-3797bbd7cd8d)
![Screenshot (75)](https://github.com/user-attachments/assets/f8c08cc5-626a-43d1-a569-506b0951d275)
