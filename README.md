# Ticker - Interactive Time Management Web App

A comprehensive productivity web application that transforms how users track and manage their daily goals with gamified progress tracking and intelligent timer functionality.

## 🚀 Features

### Core Functionality
- **Goal-Based Time Tracking**: Create, start, pause, and resume timers for individual goals
- **Multi-Goal Management**: Switch between multiple active goals while preserving progress
- **Smart Timer Logic**: Timestamp-based calculations ensure accuracy even when browser tabs are inactive
- **Progress Visualization**: Interactive floating dashboard with real-time statistics

### User Experience
- **Achievement System**: Motivational quotes and performance levels (Beast Mode, Target Complete)
- **Calendar Integration**: Color-coded daily progress indicators
  - Red: 2-4 hours of work
  - Yellow: 4-6 hours of work  
  - Green: 6+ hours of work
- **Monthly Reports**: Detailed task breakdowns with total hours and time analytics
- **Resource Optimization**: Smart background animations with auto-pause functionality

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Database**: MongoDB Atlas
- **Backend**: MongoDB Atlas Realm (Serverless Functions)
- **Authentication**: Clerk
- **Styling**: CSS3 with Animations

## 🏗️ Architecture

This project uses a **serverless architecture** powered by MongoDB Atlas Realm, eliminating the need for a traditional backend server.

### Key Technical Features
- **Serverless CRUD Operations**: All database operations handled through MongoDB Realm functions
- **Timestamp-Based Timer**: Overcomes browser limitations with inactive tabs
- **Intelligent Resource Management**: Background videos auto-pause when user is away
- **Real-time Data Sync**: Seamless synchronization across user sessions

## 🚧 Major Technical Challenges Solved

### Timer Functionality
The biggest technical challenge was implementing reliable timer functionality:
- **Problem**: Standard JavaScript loops fail when browser tabs become inactive
- **Solution**: Developed timestamp-based calculation system that works regardless of tab state
- **Implementation**: Timer accuracy maintained through start/pause/resume cycles using precise timestamp calculations

### Resource Optimization
- Intelligent background animation controls
- Auto-pause video when user leaves the page
- Automatic video reload on page refresh

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ticker.git
cd ticker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
MONGODB_REALM_APP_ID=your_realm_app_id
```

4. Set up MongoDB Atlas Realm
- Create a MongoDB Atlas cluster
- Set up Realm application
- Configure authentication with Clerk
- Deploy Realm functions for CRUD operations

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage

1. **Sign Up/Login**: Authenticate using Clerk
2. **Create Goals**: Set up your productivity goals with estimated completion times
3. **Start Tracking**: Begin timer for any goal
4. **Switch Goals**: Seamlessly switch between multiple active goals
5. **Monitor Progress**: View real-time progress in floating dashboard
6. **Check Calendar**: Review daily progress with color-coded indicators
7. **Generate Reports**: Create monthly reports with detailed analytics

## 📱 Screenshots

[Add screenshots of your application here]

## 🔧 MongoDB Realm Functions

The application uses several Realm functions for backend operations:
- `createGoal`: Create new productivity goals
- `updateGoalProgress`: Update timer progress
- `getGoalHistory`: Retrieve goal completion history
- `generateMonthlyReport`: Create detailed monthly reports

## 🎨 Performance Features

- **Efficient Timer**: Continues running even when browser throttles inactive tabs
- **Resource Management**: Background animations pause automatically
- **Real-time Updates**: Instant progress synchronization
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🚀 Deployment

The application can be deployed on:
- Vercel (Recommended for Next.js)
- Netlify
- Any platform supporting React applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨💻 Author

**Your Name**
- GitHub: [@RahulSainijeelo](https://github.com/RahulSainijeelo)
- LinkedIn: [ Rahul Saini](https://linkedin.com/in/r-rahul-s-saini)

## 🙏 Acknowledgments

- MongoDB Atlas Realm for serverless backend capabilities
- Clerk for seamless authentication
- React.js community for excellent documentation
- All beta testers who provided valuable feedback

***

**Live Demo**: [Ticker](ticker.iamsaini.space)

**Note**: This application demonstrates advanced timer functionality, serverless architecture, and intelligent resource management - perfect for developers interested in productivity applications and modern web development practices.
