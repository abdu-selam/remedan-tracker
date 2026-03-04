# Abidin Remedan Tracker

## 📌 Overview

**Abidin Ramadan Tracker** is a web app that helps Muslims track their daily Ramadan worship, including **Quran reading, Terawih prayers, and Azkar (remembrance of Allah)**. Stay consistent, monitor progress, and strengthen your connection with Allah during this blessed month.

## Screenshots

| Quran Page                             | Zhikr Page                             | Terawih Page                               |
| -------------------------------------- | -------------------------------------- | ------------------------------------------ |
| ![Quran Page](./screenshots/quran.jpg) | ![Zhikr Page](./screenshots/zhikr.jpg) | ![Terawih Page](./screenshots/terawih.jpg) |

## ✨ Features

- **Daily Quran Tracking**
- **Zhikr Daily Tracking with Specified Amount**
- **Daily Terawih Tracking**:
- **Add Custom Zhikr According To Your Need**
- **Responsive Design**
- **Beautiful Ui**:

## 🛠️ Technologies Used

### Frontend:

- **React** : For ui building and front end routing
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
- **Vite** : For Building and bundling
  <img src="https://logo.svgcdn.com/logos/vitejs.svg" alt="vite" width="30" height="30"/>
- **Tailwind CSS** : For Styling Ui
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/>

### Backend:

- Express.js
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="70" height="70"/>
- NodeJS
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>

### Database:

- Mongodb
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="50" height="50"/>

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/abdu-selam/remedan-tracker.git
```

2. Navigate to the project directory:

```bash
cd remedan-tracker
```

3. navigate to front end and back end 

**For Frontend**

```bash
cd client
```

**For Backend**

```bash
cd server
```

4. install needed packages for both front end backend

```bash
npm install
```

5. open app in `http://localhost:5173` or given react host

<span style="color: red;">⚠ make sure you have been added proper environment variables for both frontend and backend</span> 

## Environment Variables

Frontend Envirenment is

```env
VITE_API_URL=<your_backend_url>
```

Backend Envirenment is

```env
PORT=<your_server_port>
NODE_ENV=<development_or_production>

MONGODB_URL=<your_mongodb_uri>

JWT_ACCESS=<your_access_token_secret>
JWT_REFRESH=your_refresh_token_secret

CLIENT_URL=<client_url>

EMAIL_KEY=<brevo_api_key>
```


## 📁 Project Structure

```
calculator-app/
├── client         # Complete React frontend
└── server        # Complete Express Backend
```

## 💡 Future Improvements

- Add Zhikr counter
- Daily Hadis 

## 🤝 Contributing

Contributions are welcome! Open an issue or pull request for new features or improvements.

## 📝 License

This project is open-source and free to use for personal or community purposes.

## 🙏 Message

May this app help you strengthen your connection with Allah, maintain consistency in worship, and make your Ramadan spiritually fulfilling.