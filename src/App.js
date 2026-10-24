
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection using your supplied credentials.
// No .env file is required.
const MONGO_URI =
  "mongodb://user_4526manyt:p4526manyt@db01.dbhost.dev:5050/db_4526manyt?authSource=db_4526manyt";
app.use(cors());
app.use(express.json({ limit: "10kb" }));

const internships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    duration: "3 months",
    mode: "Remote",
    stipend: "₹10,000/month",
    description: "Build responsive websites and interfaces using React.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "CloudSpark Technologies",
    duration: "6 months",
    mode: "Hybrid",
    stipend: "₹15,000/month",
    description: "Develop REST APIs and database applications.",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    id: "3",
    title: "Full Stack Developer Intern",
    company: "Innovate Labs",
    duration: "4 months",
    mode: "Remote",
    stipend: "₹12,000/month",
    description: "Build full-stack applications using modern technologies.",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "4",
    title: "Data Analyst Intern",
    company: "DataBridge Analytics",
    duration: "3 months",
    mode: "On-site",
    stipend: "₹8,000/month",
    description: "Analyze data and create useful reports.",
    skills: ["Python", "SQL", "Excel", "Data Visualization"],
  },
];

// Mongoose schema
const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
      match: /^[a-zA-Z0-9_-]+$/,
    },
    internshipId: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4"],
    },
    internshipTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Internship Portal API is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// Get all internships
app.get("/api/internships", (req, res) => {
  res.json({
    success: true,
    internships,
  });
});

// Get internship details
app.get("/api/internships/:id", (req, res) => {
  const internship = internships.find(
    (item) => item.id === req.params.id
  );

  if (!internship) {
    return res.status(404).json({
      success: false,
      message: "Internship not found",
    });
  }

  res.json({
    success: true,
    internship,
  });
});

// Submit a student application
app.post("/api/applications", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "MongoDB is unavailable. Please try again later.",
      });
    }

    const { name, email, rollNumber, internshipId } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof rollNumber !== "string" ||
      typeof internshipId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all application details.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanRoll = rollNumber.trim();

    if (cleanName.length < 2 || cleanName.length > 80) {
      return res.status(400).json({
        success: false,
        message: "Name must contain 2 to 80 characters.",
      });
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!/^[a-zA-Z0-9_-]{2,30}$/.test(cleanRoll)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid roll number.",
      });
    }

    const internship = internships.find(
      (item) => item.id === internshipId
    );

    if (!internship) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid internship.",
      });
    }

    const application = await Application.create({
      name: cleanName,
      email: cleanEmail,
      rollNumber: cleanRoll,
      internshipId: internship.id,
      internshipTitle: internship.title,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application: {
        id: application._id,
        name: application.name,
        email: application.email,
        rollNumber: application.rollNumber,
        internshipId: application.internshipId,
        internshipTitle: application.internshipTitle,
        createdAt: application.createdAt,
      },
    });
  } catch (error) {
    console.error("Application error:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to submit application. Please try again.",
    });
  }
});

// Get all submitted applications
app.get("/api/applications", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "MongoDB is unavailable.",
      });
    }

    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Fetch applications error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve applications.",
    });
  }
});

// Handle unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// Handle malformed JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body.",
    });
  }

  console.error("Server error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
