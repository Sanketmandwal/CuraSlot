# CuraSlot: Doctor Appointment Booking System

CuraSlot is a comprehensive Doctor Appointment Booking System built using the **MERN Stack**. It provides separate interfaces for admins, doctors, and clients to streamline the process of booking and managing appointments.

## 🚀 Features

### Client
- Create and manage personal profiles.
- Book appointments with specific doctors.
- Authenticate and log in securely.

### Doctor
- Create and manage profiles.
- Secure authentication using JWT.
- Manage appointments with patients.

### Admin
- Manage patient and doctor data.
- Add new doctors to the system.
- Oversee and manage all appointments.

### Additional Features
- Secure authentication using **JWT**.
- Payment integration with **Razorpay** for seamless transactions.

---

## 🔧 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Razorpay

---

## 🗂 Project Structure

```
CuraSlot/
├── Frontend -client/               # Frontend code (React)
├── Frontend - admin                # Admin-specific pages
├── server/                         # Backend code (Node.js + Express)
├── .env.sample                     # Environment variable sample file
└── README.md                       # Project documentation
```

---

## ⚙️ Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sanketmandwal/CuraSlot.git
   cd CuraSlot
   ```

2. **Set up environment variables**:
   - Rename `.env.sample` to `.env` in the `server/` directory.
   - Update the file with your environment details.

3. **Install dependencies**:
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd client
     npm install
     ```

4. **Start the application**:
   - Backend:
     ```bash
     cd server
     npm run dev
     ```
   - Frontend:
     ```bash
     cd client
     npm start
     ```

5. **Access the application**:
   Open your browser and visit `http://localhost:5173`.

---

## 🎨 Screenshots

*(Add screenshots or GIFs here to showcase the application)*

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:
1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add your message'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## 🖋️ License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

Feel free to reach out:
- **Author**: [Sanket Mandwal](https://github.com/Sanketmandwal)
- **Email**: your.email@example.com

---
