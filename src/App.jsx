
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL || "https://7399304fb1f4-0af409cb-5300.ws6.app/proxy/5000/"
).replace(/\/+$/, "");

const internships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    duration: "3 months",
    mode: "Remote",
    stipend: "₹10,000/month",
    description:
      "Build responsive websites and modern user interfaces using React.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "CloudSpark Technologies",
    duration: "6 months",
    mode: "Hybrid",
    stipend: "₹15,000/month",
    description:
      "Build REST APIs and manage databases using Node.js and Express.",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    id: "3",
    title: "Full Stack Developer Intern",
    company: "Innovate Labs",
    duration: "4 months",
    mode: "Remote",
    stipend: "₹12,000/month",
    description:
      "Develop complete web applications using frontend and backend technologies.",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "4",
    title: "Data Analyst Intern",
    company: "DataBridge Analytics",
    duration: "3 months",
    mode: "On-site",
    stipend: "₹8,000/month",
    description:
      "Analyze data, create reports, and discover useful business insights.",
    skills: ["Python", "SQL", "Excel", "Data Visualization"],
  },
];

const initialForm = {
  name: "",
  email: "",
  rollNumber: "",
  internshipId: "",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fc",
    color: "#172033",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "28px 20px",
  },
  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
  },
  button: {
    display: "inline-block",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginTop: "7px",
    marginBottom: "17px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "15px",
  },
};

function Header() {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Link
          to="/"
          style={{
            color: "#4f46e5",
            fontSize: 25,
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          InternHub
        </Link>

        <nav style={{ display: "flex", gap: 20 }}>
          <Link to="/" style={{ color: "#374151" }}>
            Home
          </Link>
          <a href="/#apply" style={{ color: "#374151" }}>
            Apply Now
          </a>
        </nav>
      </div>
    </header>
  );
}

function InternshipList() {
  return (
    <>
      <section
        style={{
          ...styles.card,
          background: "#eef2ff",
          padding: "42px 28px",
          marginBottom: 32,
        }}
      >
        <p style={{ color: "#4f46e5", fontWeight: "bold" }}>
          YOUR CAREER STARTS HERE
        </p>

        <h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", margin: "12px 0" }}>
          Find Your Perfect Internship
        </h1>

        <p style={{ color: "#475569", lineHeight: 1.8 }}>
          Explore internship opportunities, develop practical skills, and
          take the first step toward your dream career.
        </p>

        <a href="#internships" style={styles.button}>
          Explore Internships
        </a>
      </section>

      <h2 id="internships">Available Internships</h2>
      <p style={{ color: "#64748b" }}>
        Choose an opportunity that matches your interests.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 22,
        }}
      >
        {internships.map((item) => (
          <article key={item.id} style={styles.card}>
            <span
              style={{
                background: "#eef2ff",
                color: "#4338ca",
                padding: "6px 10px",
                borderRadius: 20,
                fontSize: 12,
              }}
            >
              {item.mode}
            </span>

            <h3>{item.title}</h3>

            <p style={{ color: "#4f46e5", fontWeight: "bold" }}>
              {item.company}
            </p>

            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              {item.description}
            </p>

            <p>🗓 Duration: {item.duration}</p>
            <p>💰 Stipend: {item.stipend}</p>

            <Link
              to={`/internship/${item.id}`}
              style={{ ...styles.button, marginTop: 8 }}
            >
              View Details
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

function ApplicationForm({ selectedId = "" }) {
  const [form, setForm] = useState({
    ...initialForm,
    internshipId: String(selectedId || ""),
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (selectedId) {
      setForm((previous) => ({
        ...previous,
        internshipId: String(selectedId),
      }));
    }
  }, [selectedId]);

  function handleChange(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const name = form.name.trim();
    const email = form.email.trim();
    const rollNumber = form.rollNumber.trim();

    if (name.length < 2 || name.length > 80) {
      setMessage("Name must be between 2 and 80 characters.");
      setMessageType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (!/^[a-zA-Z0-9_-]{2,30}$/.test(rollNumber)) {
      setMessage(
        "Roll number must contain 2–30 letters, numbers, underscores or hyphens."
      );
      setMessageType("error");
      return;
    }

    const internship = internships.find(
      (item) => item.id === form.internshipId
    );

    if (!internship) {
      setMessage("Please select an internship.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rollNumber,
          internshipId: internship.id,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit the application."
        );
      }

      setMessage(
        result.message || "Your application was submitted successfully!"
      );
      setMessageType("success");
      setForm(initialForm);
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check the API URL and server."
          : error.message || "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="apply" style={{ ...styles.card, marginTop: 32 }}>
      <h2>Student Application Form</h2>
      <p style={{ color: "#64748b" }}>
        Enter your information to apply for an internship.
      </p>

      {message && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            padding: 13,
            borderRadius: 8,
            marginBottom: 18,
            background:
              messageType === "success" ? "#dcfce7" : "#fee2e2",
            color: messageType === "success" ? "#166534" : "#991b1b",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Student Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={80}
          required
          style={styles.input}
        />

        <label htmlFor="email">Email ID</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="student@example.com"
          autoComplete="email"
          maxLength={254}
          required
          style={styles.input}
        />

        <label htmlFor="rollNumber">Roll Number</label>
        <input
          id="rollNumber"
          name="rollNumber"
          value={form.rollNumber}
          onChange={handleChange}
          placeholder="Enter your roll number"
          minLength={2}
          maxLength={30}
          required
          style={styles.input}
        />

        <label htmlFor="internshipId">Select Internship</label>
        <select
          id="internshipId"
          name="internshipId"
          value={form.internshipId}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">-- Choose an internship --</option>
          {internships.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title} - {item.company}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            width: "100%",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </section>
  );
}

function HomePage() {
  const location = useLocation();
  const selectedId = location.state?.selectedId || "";

  return (
    <main style={styles.container}>
      <InternshipList />
      <ApplicationForm
        key={selectedId || "default"}
        selectedId={selectedId}
      />
    </main>
  );
}

function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const internship = internships.find((item) => item.id === id);

  if (!internship) {
    return (
      <main style={styles.container}>
        <h2>Internship not found</h2>
        <Link to="/" style={styles.button}>
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <Link to="/" style={{ color: "#4f46e5" }}>
        ← Back to internships
      </Link>

      <section style={{ ...styles.card, marginTop: 20 }}>
        <p style={{ color: "#4f46e5", fontWeight: "bold" }}>
          {internship.company}
        </p>

        <h1>{internship.title}</h1>
        <p style={{ lineHeight: 1.8 }}>{internship.description}</p>

        <p><strong>Duration:</strong> {internship.duration}</p>
        <p><strong>Work Mode:</strong> {internship.mode}</p>
        <p><strong>Stipend:</strong> {internship.stipend}</p>

        <h3>Required Skills</h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {internship.skills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: "8px 12px",
                background: "#eef2ff",
                color: "#4338ca",
                borderRadius: 20,
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <button
          style={{ ...styles.button, marginTop: 24 }}
          onClick={() =>
            navigate("/", {
              state: { selectedId: internship.id },
            })
          }
        >
          Apply for This Internship
        </button>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main style={styles.container}>
      <h2>Page not found</h2>
      <Link to="/" style={styles.button}>
        Return Home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.page}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/internship/:id"
            element={<InternshipDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer
          style={{
            textAlign: "center",
            padding: 24,
            color: "#64748b",
          }}
        >
          © 2026 InternHub | Student Internship Portal
        </footer>
      </div>
    </BrowserRouter>
  );
}
