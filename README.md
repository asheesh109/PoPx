# PopX - Modern Authentication Platform

<div align="center">
  
  
  <h3>A sleek, modern authentication platform built with React</h3>
  
  [![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
</div>

## 🚀 Features

### ✨ Authentication
- **Secure Login & Signup** - Complete user authentication system
- **Multi-step Registration** - Progressive form with avatar upload
- **Form Validation** - Real-time validation with custom hooks
- **Password Security** - Show/hide password functionality
- **Responsive Design** - Mobile-first responsive interface

### 🎨 User Experience  
- **Dark/Light Theme** - Toggle between themes with context management
- **Toast Notifications** - Top-positioned feedback system
- **Loading States** - Smooth loading animations
- **Protected Routes** - Route-level authentication guards
- **Progressive Forms** - Step-by-step signup process

### 🛠️ Technical Features
- **React Router** - Client-side routing with navigation guards
- **Context API** - State management for auth and themes
- **Custom Hooks** - Reusable form validation logic
- **Modern UI** - Clean, contemporary design with animations
- **TypeScript Ready** - Easy migration to TypeScript

## 🏗️ Architecture

```
src/
├── Components/
│   ├── auth/
│   │   ├── LoginForm.jsx          # Login component
│   │   ├── SignupForm.jsx         # Multi-step signup
│   │   └── ProtectedRoute.jsx     # Route guard
│   ├── common/
│   │   ├── Toast.jsx              # Notification system
│   │   └── AvatarUpload.jsx       # Avatar handling
│   ├── dashboard/
│   │   └── ProfileDashboard.jsx   # User dashboard
│   └── Home/
│       └── Home.jsx               # Landing page
├── Contexts/
│   ├── AuthContext.jsx            # Authentication state
│   └── ThemeContext.jsx           # Theme management
├── hooks/
│   └── useFormValidation.js       # Form validation hook
└── styles/
    └── Auth.css                   # Authentication styles
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- Firebase account (for hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/popx-auth.git
   cd popx-auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration


### Firebase Setup (Optional)
For deployment to Firebase Hosting:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 📱 Usage

### Authentication Flow
1. **Landing Page** - Welcome screen with navigation
2. **Login** - Email/password authentication
3. **Signup** - Two-step registration process:
   - Step 1: Basic information (name, email, phone, password)
   - Step 2: Profile setup (avatar, company, agency status)
4. **Dashboard** - Protected user area

### Default Test Account
```
Email: user@example.com
Password: password123
```

## 🎯 Key Components

### LoginForm
- Email/password validation
- Loading states
- Toast notifications
- Navigation to signup

### SignupForm
- Multi-step form progression
- Avatar upload functionality
- Company/agency selection
- Form validation with error handling

### AuthContext
- User state management
- Login/signup/logout functions
- Mock user storage (localStorage)
- Loading and error states

### ThemeContext
- Dark/light mode toggle
- Persistent theme selection
- System theme detection

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Code Structure Guidelines
- **Components** - Functional components with hooks
- **Contexts** - Global state management
- **Hooks** - Custom reusable logic
- **Styles** - CSS modules or styled-components


## 🔒 Security Features

- **Form Validation** - Client-side input validation
- **Protected Routes** - Authentication required pages
- **Secure Storage** - No sensitive data in localStorage
- **Password Security** - Minimum length requirements
- **Input Sanitization** - XSS protection

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain consistent code style
- Add comments for complex logic
- Test new features thoroughly



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 📞 Support

- **Email**: ashishparab03@gmail.com
- **LinkedIn**: [Linkedin](www.linkedin.com/in/ashishparab03)


---

<div align="center">
  <p>Made with ❤️ by Ashish</p>
  <p>
    <a href="#popx---modern-authentication-platform">Back to Top</a>
  </p>
</div>
