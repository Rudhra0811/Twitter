# Twitter Clone

## Overview

This project is a Twitter clone built with React and Vite. It mimics core Twitter functionalities, providing users with a familiar social media experience. The application uses mock APIs to simulate backend interactions, making it suitable for frontend development and demonstration purposes.

## Features

- User authentication (signup/login)
- Create and view posts (tweets)
- Like and unlike posts
- Comment on posts
- User profiles
- Follow/unfollow functionality
- Notifications system
- Search functionality for users and posts
- Responsive design for mobile and desktop

## Technologies Used

- React.js
- Vite
- React Router for navigation
- CSS for styling
- Mock APIs for simulating backend interactions

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Rudhra0811/Twitter.git
   cd Twitter
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to view the application.

## Project Structure

```
twitter-clone/
│
├── src/
│   ├── api/              # Mock API functions
│   ├── components/       # React components
│   ├── contexts/         # React contexts (e.g., AuthContext)
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
│
├── public/               # Public assets
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## Usage

- Register a new account or use the demo account:
  - Username: demo
  - Password: password

- Create posts, like and comment on existing posts
- Visit user profiles and follow/unfollow other users
- Check notifications for new likes, comments, and followers
- Use the search functionality to find users or posts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- This project was created as a learning exercise and is not affiliated with Twitter.
- Profile images are placeholders and should be replaced with actual user avatars in a production environment.

## Contact

For any questions or feedback, please contact [Your Name] at [your.email@example.com].