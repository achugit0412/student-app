import "./App.css";

// Student details stored in JavaScript variables
const student1Name = "Anu";
const student1Department = "CSE";
const student1Year = "3rd Year";

const student2Name = "Bala";
const student2Department = "Computer Science";
const student2Year = "3rd Year";

// Header Component
function Header() {
  return <h1 className="header">Student Management System</h1>;
}

// Reusable StudentProfile Component
function StudentProfile({ name, department, year }) {
  return (
    <div className="student-profile">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>
  );
}

// Footer Component
function Footer() {
  return <footer>© 2026 Student Management System</footer>;
}

// Main App Component
function App() {
  return (
    <div className="app">
      <Header />

      <h2>Student 1</h2>
      <StudentProfile
        name={student1Name}
        department={student1Department}
        year={student1Year}
      />

      <h2>Student 2</h2>
      <StudentProfile
        name={student2Name}
        department={student2Department}
        year={student2Year}
      />

      <Footer />
    </div>
  );
}

export default App;