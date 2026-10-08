import { useEffect, useState } from "react";
import "./App.css";

// Student details
const student1Name = "Anu";
const student1Department = "CSE";
const student1Year = "3rd Year";

// Header Component
function Header() {
  return <h1 className="header">Student Management System</h1>;
}

// StudentProfile Component
function StudentProfile({ name, department, year, count }) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = `Practice Sessions: ${count}`;

    return () => {
      document.title = previousTitle;
    };
  }, [count]);

  return (
    <div className="student-profile">
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Department:</strong> {department}
      </p>
      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>Practice Sessions:</strong> {count}
      </p>
    </div>
  );
}

// Footer Component
function Footer() {
  return <footer>© 2026 Student Management System</footer>;
}

// Main App Component
function App() {
  const [practiceCount, setPracticeCount] = useState(0);
  const [showProfile, setShowProfile] = useState(true);

  return (
    <div className="app">
      <Header />

      <h2>Student Profile</h2>

      <button onClick={() => setShowProfile(!showProfile)}>
        {showProfile ? "Hide Profile" : "Show Profile"}
      </button>

      {showProfile && (
        <StudentProfile
          name={student1Name}
          department={student1Department}
          year={student1Year}
          count={practiceCount}
        />
      )}

      <div className="practice-buttons">
        <button onClick={() => setPracticeCount(practiceCount + 1)}>
          Complete Practice
        </button>

        <button onClick={() => setPracticeCount(0)}>Reset</button>
      </div>

      <Footer />
    </div>
  );
}

export default App;
