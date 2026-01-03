
import { Era, ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  header: {
    name: "Seeron Sivashankar",
    contact: {
      phone: "647-282-4910",
      email: "seeron.sivashankar@mail.utoronto.ca",
      linkedin: "linkedin.com/in/seeron-sivashankar",
      github: "github.com/seeron6"
    }
  },
  education: [
    {
      school: "University of Toronto",
      degree: "Bachelor of Applied Science in Computer Engineering + PEY Co-op"
    }
  ],
  experience: [
    {
      role: "Software Consultant",
      company: "Brainweber Inc.",
      location: "Toronto, ON",
      period: "Sept. 2024 – May 2028",
      points: [
        "Implemented a Voice Chat AI feature for OrthoPoP to enable real-time conversation.",
        "Developed evaluation criteria, testing workflows, and technical specifications for AI features.",
        "Collaborated with cross-functional teams to ensure features were production-ready."
      ]
    },
    {
      role: "Software Developer",
      company: "UCMAS Canada",
      location: "Toronto, ON",
      period: "Jun. 2020 – Present",
      points: [
        "Managed scoring software for over 4,000 results for national competitions.",
        "Optimized software usability for better user experience.",
        "Designed a resource management system for over 200 assets with automated reminders."
      ]
    },
    {
      role: "Technical Lead - Event Organizer",
      company: "UCMAS Sri Lanka",
      location: "Colombo, Sri Lanka",
      period: "Jul. 2025 – Aug. 2025",
      points: [
        "Hosted an international competition with 3,500+ competitors and 5,000 guests.",
        "Contributed to achieving world records recognized in the Cholan Book of World Records.",
        "Led the software team for technical operations and managed VIP communications."
      ]
    },
    {
      role: "Young Engineers Instructor",
      company: "E2 Young Engineers",
      location: "Toronto, ON",
      period: "Sept. 2022 – Sept. 2024",
      points: [
        "Taught physics and engineering concepts to beginner students weekly.",
        "Guided students in designing and programming robotic models."
      ]
    }
  ],
  projects: [
    {
      title: "Employment Run (FPGA Game)",
      tech: "Verilog, Quartus, DE1-SoC FPGA",
      description: "Developed a real-time game. Implemented hardware logic for FSM, collision detection, and obstacle generation."
    },
    {
      title: "Medscope (NewHacks)",
      tech: "Python, OpenCV, PyTorch, Gemini API",
      description: "Detected over 1,000 objects in images. Integrated Gemini API for medical device concepts and a live camera feed pipeline."
    },
    {
      title: "Student Scanning & Mark Entry Software",
      tech: "Python, HTML, CSS",
      description: "Built a platform to record attendance for 5,000+ students and manage competition marks."
    },
    {
      title: "First Robotics QR Vision Tracking",
      tech: "Java, Python, C++, AprilTag",
      description: "Implemented AprilTag-based vision tracking for robot localization."
    }
  ],
  skills: {
    languages: "Java, Python, C, C++, C#, SQL, JavaScript, HTML, CSS, MATLAB, Robot C",
    frameworks: ".NET Core 6+, ReactJS, TensorFlow, PyTorch, Serenity.js, Bootstrap",
    tools: "Git, Docker, AWS, Azure, Postgres, Xcode, Visual Studio",
    libraries: "NumPy, Pandas, Matplotlib, OpenCV, React Router, WPILib"
  }
};

export const ERA_THEMES = {
  [Era.RETRO]: {
    bg: "bg-amber-900", 
    primary: "text-pink-500",
    secondary: "text-green-500",
    font: "font-[VT323]",
  },
  [Era.MODERN]: {
    bg: "bg-slate-900", 
    primary: "text-white",
    secondary: "text-emerald-600",
    font: "font-sans",
  },
  [Era.FUTURE]: {
    bg: "bg-black", 
    primary: "text-cyan-400",
    secondary: "text-purple-500",
    font: "font-[Orbitron]",
  }
};
