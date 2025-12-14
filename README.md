# 🎓 GrantGenius

A Scholarship Management Platform

## 🔗 Live Site

👉 https://your-live-site-link.com

## 🛠 Server Repository

👉 https://github.com/your-username/grantgenius-server

## 💻 Client Repository

👉 https://github.com/your-username/grantgenius-client

---

## 📌 Project Purpose

**GrantGenius** is a full-stack MERN-based scholarship management platform designed to connect students with scholarship opportunities and streamline the application, review, and administration process.  
It simplifies scholarship discovery for students while enabling moderators and admins to efficiently manage applications, reviews, and platform data.

---

## 🚀 Key Features

### 👨‍🎓 Student Features

- Browse and search scholarships
- Filter scholarships by category, country, and degree
- Apply for scholarships using Stripe payment
- Track application status (Pending → Processing → Completed)
- Edit or delete applications (pending only)
- Submit reviews after application completion
- View and manage personal reviews

### 🧑‍💼 Moderator Features

- View all student applications
- Review application details
- Provide feedback to students
- Update application status
- Reject applications if necessary
- Moderate student reviews (delete inappropriate reviews)

### 👨‍💻 Admin Features

- Manage users (change roles, delete users)
- Add, update, and delete scholarships
- View platform analytics
- Monitor total users, scholarships, applications, and revenue
- Visualize data using charts

---

## 🧱 Data Collections (MongoDB)

### Users Collection

- name
- email
- photoURL
- role (Student / Moderator / Admin)

### Scholarships Collection

- scholarshipName
- universityName
- universityImage
- universityCountry
- universityCity
- universityWorldRank
- subjectCategory
- scholarshipCategory
- degree
- tuitionFees (optional)
- applicationFees
- serviceCharge
- applicationDeadline
- scholarshipPostDate
- postedUserEmail

### Applications Collection

- scholarshipId
- userId
- userName
- userEmail
- universityName
- scholarshipCategory
- degree
- applicationFees
- serviceCharge
- applicationStatus (pending / processing / completed)
- paymentStatus (paid / unpaid)
- applicationDate
- feedback

### Reviews Collection

- scholarshipId
- universityName
- userName
- userEmail
- userImage
- ratingPoint
- reviewComment
- reviewDate

---

## 🔐 Authentication & Security

- Firebase Authentication (Email/Password & Google Login)
- JWT-based API authorization
- Role-based route protection (Admin & Moderator)
- Environment variables used to protect:
  - Firebase config
  - MongoDB credentials
  - Stripe secret keys

---

## 💳 Payment System

- Stripe payment integration
- Successful payment:
  - Application saved with `paymentStatus: paid`
- Failed payment:
  - Application saved with `paymentStatus: unpaid`
  - Retry payment from dashboard

---

## 📊 Dashboard Overview

### Admin Dashboard

- My Profile
- Add Scholarship
- Manage Scholarships
- Manage Users
- Analytics (charts & stats)

### Moderator Dashboard

- My Profile
- Manage Applications
- Application Review & Feedback
- Update Application Status
- Moderate Reviews

### Student Dashboard

- My Profile
- My Applications
- Pay for pending applications
- Add & manage reviews

---

## 🎨 UI & UX Highlights

- Built with **DaisyUI** (no external UI frameworks)
- Fully responsive (mobile, tablet, desktop)
- Consistent color theme and typography
- Framer Motion animations
- Loaders & skeletons on all data-fetching pages
- Custom 404 error page
- Clean dashboard layout with role-based sidebar

---

## 📦 NPM Packages Used

### Client

- react
- react-router-dom
- firebase
- axios
- sweetalert2
- react-hook-form
- framer-motion
- stripe-js
- daisyui
- tailwindcss

### Server

- express
- mongodb
- jsonwebtoken
- cors
- dotenv
- stripe

---

## 👑 Admin Credentials (For Evaluation)

**Email:** admin@gmail.com  
**Password:** Admin@123

---

## ⚙️ Deployment Notes

- Deployed on production-ready hosting
- Firebase domain authorization configured
- No CORS / 404 / 504 errors
- Page reload works on all routes
- Private routes persist authentication

---

## ✅ Assignment Checklist Status

- ✔ 20+ meaningful client commits
- ✔ 12+ meaningful server commits
- ✔ Secure environment variables
- ✔ Role-based dashboards
- ✔ Stripe integration
- ✔ Server-side search, filter, sort & pagination
- ✔ Unique & recruiter-friendly design

---

## 🏁 Conclusion

**GrantGenius** demonstrates a complete, secure, and scalable scholarship management solution built with modern MERN stack practices, focusing on usability, performance, and real-world workflows.

---

Thank you for reviewing GrantGenius 🎓✨
