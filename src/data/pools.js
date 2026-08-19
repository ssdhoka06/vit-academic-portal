/**
 * pools.js
 * ---------------------------------------------------------------------------
 * Reference pools the generators sample from deterministically. Everything
 * here is illustrative mock data — swap or extend freely; nothing elsewhere
 * in the app needs to change as long as the shape (arrays of strings /
 * {title, problemStatement} pairs) is preserved.
 * ---------------------------------------------------------------------------
 */

export const FIRST_NAMES = [
  "Aarav", "Ishaan", "Vivaan", "Kabir", "Reyansh", "Aditya", "Rohan", "Sai", "Arjun", "Dhruv",
  "Ananya", "Diya", "Isha", "Kavya", "Meera", "Riya", "Sanya", "Tanvi", "Vidya", "Zara",
  "Om", "Yash", "Karan", "Nikhil", "Pranav", "Siddharth", "Aryan", "Devansh", "Harsh", "Manav",
  "Pooja", "Neha", "Shreya", "Aditi", "Priya", "Sneha", "Trisha", "Radhika", "Naina", "Ira",
];

export const LAST_NAMES = [
  "Kulkarni", "Deshmukh", "Patil", "Joshi", "Kadam", "Shinde", "Pawar", "Jadhav", "More", "Bhosale",
  "Gupta", "Sharma", "Verma", "Iyer", "Nair", "Rao", "Reddy", "Mehta", "Shah", "Chavan",
];

// The department's Head of Department — sourced directly from the official
// department page (vit.edu/CSE-AI-ML/about/). Every batch's "Faculty
// Mentor" tab shows this single, real, fixed person rather than a
// randomly-picked pool member, since the HOD is the batch's actual
// assigned mentor of record.
export const HOD_FACULTY = {
  name: "Dr. Premanand Ghadekar",
  designation: "Professor & Head of Department",
  dept: "CSE (AI & ML)",
  email: "premanand.ghadekar@vit.edu",
  linkedin: "https://www.linkedin.com/in/dr-premanand-ghadekar-18bb6022/",
};

export const FACULTY_POOL = [
  { name: "Dr. Sunita Rangnekar", dept: "CSE (AI & ML)", designation: "Associate Professor" },
  { name: "Dr. Milind Ghorpade", dept: "CSE (AI & ML)", designation: "Professor" },
  { name: "Prof. Ashwini Deshpande", dept: "CSE (AI & ML)", designation: "Assistant Professor" },
  { name: "Dr. Rahul Kelkar", dept: "CSE (AI & ML)", designation: "Associate Professor" },
  { name: "Prof. Neeta Bapat", dept: "CSE (AI & ML)", designation: "Assistant Professor" },
  { name: "Dr. Sameer Bhide", dept: "CSE (AI & ML)", designation: "Professor" },
  { name: "Prof. Vaishali Kulthe", dept: "CSE (AI & ML)", designation: "Assistant Professor" },
  { name: "Dr. Prashant Autade", dept: "CSE (AI & ML)", designation: "Associate Professor" },
  { name: "Prof. Manasi Gokhale", dept: "CSE (AI & ML)", designation: "Assistant Professor" },
  { name: "Dr. Yogesh Karpe", dept: "CSE (AI & ML)", designation: "Professor" },
  { name: "Prof. Snehal Wadkar", dept: "CSE (AI & ML)", designation: "Assistant Professor" },
  { name: "Dr. Abhijit Sable", dept: "CSE (AI & ML)", designation: "Associate Professor" },
  { name: "Prof. Kalyani Ghuge", dept: "CSE (AI & ML)", designation: "Assistant Professor" },
  { name: "Dr. Varsha Dange", dept: "CSE (AI & ML)", designation: "Associate Professor" },
  { name: "Prof. Ajit Kelkar", dept: "CSE (AI & ML)", designation: "Assistant Professor" },
  { name: "Dr. Premanand Ghadekar", dept: "CSE (AI & ML)", designation: "Professor" },
];

// ---------------------------------------------------------------------------
// CP (Course Project) title pools, keyed by the `domain` field on a subject.
// ---------------------------------------------------------------------------
export const CP_TITLE_POOLS = {
  python: ["Automated Expense Tracker with CSV Reports", "Contact Book with Search & Tagging", "Weather Data Fetcher & Visualizer", "Quiz Engine with Score Analytics", "PDF Merger & Splitter Utility", "Typing Speed Test Console App", "Password Strength Checker & Generator", "Rule-Based Campus FAQ Chatbot", "Student Result Processor from Spreadsheet", "Currency Converter with Live Rates"],
  electromech: ["Single-Phase Induction Motor Speed Controller", "DC Motor Torque-Speed Characteristic Rig", "Solar-Powered Desk Fan Assembly", "Relay-Based Automatic Street Light", "Stepper Motor Positioning Demonstrator", "Transformer Efficiency Test Bench", "Servo-Controlled Robotic Arm (2-DOF)", "Battery Charge Controller for Small EV", "Electromagnetic Braking Demonstrator", "Power Factor Correction Trainer Kit"],
  dataAnalysis: ["Campus Placement Trends Dashboard", "Sports Player Performance Analyzer", "Regional Weather Trend Visualizer", "Retail Sales Pattern Explorer", "Air Quality Index Correlation Study", "Streaming Ratings Sentiment Snapshot", "Household Electricity Usage Analyzer", "College Attendance Pattern Dashboard", "Startup Funding Trends Explorer", "Public Transport Ridership Analysis"],
  calcStats: ["Numerical Root-Finder Visualizer", "Probability Distribution Simulator", "Regression Line Fitting Toolkit", "Monte-Carlo Integration Demonstrator", "Hypothesis Testing Calculator", "Fourier Series Approximation Plotter", "Gradient Descent Optimization Demo", "Central Limit Theorem Simulator", "Matrix Eigenvalue Visualizer", "Queueing Theory Wait-Time Estimator"],
  problemSolving: ["Sudoku Solver with Backtracking", "Maze Pathfinder Visualizer", "Library Fine Calculator CLI", "Tic-Tac-Toe with Minimax AI", "Recipe Recommender from Ingredients", "Text-Based Adventure Game Engine", "Simple Banking Simulation System", "Number Guessing Game with Hints", "ASCII Art Generator from Images", "Command-Line To-Do Manager"],
  linearAlgebra: ["Image Compression using SVD", "Markov-Chain Web-Surfer Simulator", "3D Transformation Visualizer", "Linear System Solver with Pivoting", "Mini PageRank Implementation", "Recommendation Engine via Matrix Factorization", "Matrix-Cipher Cryptography Toolkit", "Camera Calibration Matrix Demo", "Vector Space Visualization Tool", "Eigenface-based Face Recognition Demo"],
  webDev: ["Personal Portfolio Website", "Campus Event Registration Portal", "Recipe-Sharing Community Site", "Online Quiz Platform", "Local Business Directory Site", "Blog Platform with Markdown Support", "Expense Splitter Web App", "Campus Internship Job Board", "Restaurant Table Booking Site", "Volunteer Opportunity Finder"],
  envStudies: ["Campus Waste Segregation Tracker", "Rainwater Harvesting Feasibility Study", "Carbon Footprint Calculator App", "Urban Green-Cover Mapping Project", "E-Waste Collection Drive Planner", "Water Quality Monitoring Survey", "Renewable Energy Adoption Survey", "Noise Pollution Mapping around Campus", "Campus Biodiversity Survey Tool", "Single-Use Plastic Reduction Tracker"],
  fds: ["Nearest-Neighbour Finder using KD-Structures", "Calendar Application with File Handling", "Maze Path Finder using Stack/Queue", "Word Auto-Completion using Trie", "Bloom-Filter based Duplicate Checker", "Library Management System with BST Indexing", "Job Scheduling Simulator using Priority Queue", "Shortest-Path Circuit Solver", "Efficient Student Record Retrieval System", "2048-Style Puzzle Game Engine"],
  dbms: ["Library Management System", "Airline Reservation System", "Online Banking Ledger System", "Hospital Patient Record System", "Course Registration Database", "Inventory & Warehouse Tracker", "Hostel Room Allocation System", "Employee Payroll Database", "Event Ticket Booking System", "Vehicle Service Record Tracker"],
  oop: ["Library Management System (Java)", "Online Bank Management System", "Electricity Billing System", "e-Healthcare Appointment Manager", "Email Client Software", "Educational Network Packet Sniffer", "Data Visualization Dashboard Software", "Airline Reservation System (Swing)", "Course Management System", "Online Medical Records Manager"],
  arvr: ["AR Campus Navigation Overlay", "Virtual Chemistry Lab Simulator", "AR Furniture Placement Previewer", "VR Fire-Safety Drill Trainer", "AR Anatomy Learning App", "Virtual Museum Walkthrough", "AR Business-Card Info Overlay", "VR Public-Speaking Practice Room", "AR Parking Slot Finder", "VR Campus Orientation Tour"],
  ads: ["File-System Explorer using B+ Trees", "Spatial Query Engine using Quad-Trees", "Autocomplete Engine using Tries", "Task Scheduler using Fibonacci Heaps", "Mini GIS Engine with R-Trees", "Nearest-Neighbour Search using KD-Trees", "Disjoint-Set Network Connectivity Tool", "Skip-List In-Memory Key-Value Store", "Huffman-Coding File Compressor", "Range-Query Engine using Segment Trees"],
  ai: ["College Enquiry Chatbot", "A*-based Path-Finding Robot Navigator", "Sudoku Solver using CSP", "Expert System for Crop Advisory", "Tic-Tac-Toe with Alpha-Beta Pruning", "Heuristic Timetable Generator", "Resume Screening Rule Engine", "Search-Based Campus Route Planner", "Game-Playing Agent for Connect-4", "Student Query Resolution Chatbot"],
  os: ["CPU Scheduling Algorithm Visualizer", "Custom Shell with Piping Support", "Disk Scheduling Simulator", "Producer-Consumer Synchronization Demo", "Deadlock Detection Visualizer", "Memory Paging Simulator", "Mini File System on Virtual Disk", "Process Monitor & Resource Dashboard", "Banker's Algorithm Simulator", "Multithreaded Chat Server"],
  iot: ["Smart Irrigation Controller", "IoT-based Air Quality Monitor", "Smart Parking Slot Detector", "ESP32 Home Automation Kit", "Wearable Fall-Detection Device", "Smart Waste-Bin Fill Sensor", "IoT Campus Energy Dashboard", "Cold-Chain Temperature Logger", "RFID/BLE Smart Attendance", "Soil-Moisture Irrigation Alert System"],
  cn: ["Network Packet Analyzer Dashboard", "Campus Wi-Fi Coverage Mapper", "Socket-based Chat Application", "Network Intrusion Alert Simulator", "Bandwidth Usage Monitor", "FTP Client-Server Implementation", "VoIP Quality Analyzer Prototype", "Network Topology Visualizer", "DNS Resolution Time Analyzer", "Load-Balanced Mini Web Server"],
  cloud: ["Multi-Cloud Deployment Portal", "Serverless Image-Resize Pipeline", "Auto-Scaling Web App on AWS", "Cloud Cost Optimization Dashboard", "CI/CD Pipeline for Microservices", "Cloud-based File Sync Service", "Container Orchestration Dashboard", "Cloud Disaster-Recovery Simulation", "Cloud-Native Log Aggregator", "Multi-Tenant SaaS Billing Module"],
  ml: ["Student Performance Predictor", "Crop Yield Prediction Model", "House Price Prediction Engine", "Customer Churn Predictor", "Spam Email Classifier", "Loan Default Risk Model", "Handwritten Digit Recognizer", "Fake News Detector", "Anomaly-based Fraud Detector", "Movie Recommendation Engine"],
  daa: ["Algorithm Complexity Visualizer", "Traveling-Salesman Heuristic Explorer", "Dynamic Programming Puzzle Solver", "Graph Coloring Visualizer", "Greedy vs DP Knapsack Comparator", "Shortest-Path Algorithm Race Visualizer", "NP-Completeness Demonstrator Suite", "Approximation Algorithm Sandbox", "Divide-and-Conquer Sorting Visualizer", "Network Flow Optimization Tool"],
  se: ["Agile Sprint Tracker Tool", "Automated Test-Case Generator", "Requirement Traceability Tool", "Bug Triage & Tracking Dashboard", "UML Diagram Generator from Code", "CI Pipeline Health Dashboard", "Code Quality & Complexity Analyzer", "Release Management Tracker", "COCOMO Effort Estimation Calculator", "Peer Code-Review Workflow Tool"],
  cyber: ["Blockchain-based Certificate Verification", "Phishing URL Detector", "Educational Network Vulnerability Scanner", "Secure File-Sharing using Encryption", "AES-based Password Manager", "Blockchain Voting System Prototype", "Signature-based Intrusion Detector", "Digital Evidence Chain-of-Custody Tracker", "Smart-Contract Escrow Service", "Educational Malware Signature Classifier"],
  dl: ["Image Captioning Model", "Face Mask Detection System", "Medical X-Ray Anomaly Detector", "Handwriting-to-Text Converter", "Traffic Camera Object Detector", "CNN-based Music Genre Classifier", "Sign Language Gesture Recognizer", "Deepfake Detection Prototype", "Speech Emotion Recognizer", "Leaf-Image Crop Disease Detector"],
  genai: ["Domain-Specific Study Assistant using RAG", "AI Resume & Cover-Letter Generator", "Synthetic Dataset Generator for ML Training", "AI-Assisted Lecture-Notes Summarizer", "Prompt-Engineering Playground Tool", "AI Image Caption & Alt-Text Generator", "Conversational FAQ Bot for Departments", "AI-Assisted Code Documentation Generator", "Text-to-Diagram Generator", "Personalized Study-Plan Generator"],
  cv: ["Real-Time Object Tracking System", "Automatic Number-Plate Recognition", "Gesture-Controlled Presentation Tool", "Crowd-Density Estimator for Events", "Assembly-Line Defect Detector", "Sports Action Recognition System", "Face-Recognition Visual Attendance", "Document Scanner with Auto-Crop", "Pose Estimation for Fitness Coaching", "Camera-Trap Species Classifier"],
  agentic: ["Autonomous Research-Summary Agent", "Multi-Agent Trip-Planning Assistant", "AI Agent for Automated Bug Triage", "Autonomous Data-Pipeline Monitoring Agent", "Agentic Email Triage Assistant", "Multi-Step Coding Assistant Agent", "Autonomous Market-Research Agent", "Agentic Customer-Support Orchestrator", "Self-Correcting Test-Writing Agent", "Agentic Study-Buddy Planner"],
  pca: ["GPU vs CPU Matrix-Multiply Benchmark", "Cache-Coherence Protocol Simulator", "Pipeline Hazard Visualizer", "Multicore Scheduling Simulator", "SIMD Vectorization Performance Study", "Parallel Sorting Benchmark Suite", "Distributed Shared-Memory Emulator", "Branch-Prediction Accuracy Analyzer", "Multithreaded Matrix-Solver Benchmark", "NUMA-Aware Workload Scheduler Demo"],
};

// ---------------------------------------------------------------------------
// EDI theme pools — {title, problemStatement} pairs, keyed by domain.
// ---------------------------------------------------------------------------
export const EDI_THEME_POOLS = {
  ediFoundation: [
    { title: "Soil Moisture Alert Device", problemStatement: "Campus garden staff have no low-cost way to know when soil moisture drops below a safe threshold, leading to over- or under-watering." },
    { title: "Smart Doorbell with Motion Alert", problemStatement: "Small households lack an affordable way to be notified when someone approaches the main door from another room." },
    { title: "Portable Cold-Storage Temperature Logger", problemStatement: "Hostel mess staff need a simple way to track refrigerator temperature through the day to catch spoilage risks early." },
    { title: "Gas-Leak Early-Warning Kit", problemStatement: "Small hostel kitchens have no early-warning system for LPG leaks before they become dangerous." },
    { title: "Campus Reading-Room Noise Indicator", problemStatement: "Reading rooms have no visible indicator to remind students when ambient noise crosses a comfortable threshold." },
    { title: "Automatic Plant-Watering Trigger", problemStatement: "Potted plants in campus common areas are inconsistently watered because no one is formally responsible for a daily check." },
    { title: "Fall-Detection Wearable Prototype", problemStatement: "Elderly relatives living alone have no low-cost wearable that alerts family when a fall is detected." },
    { title: "Smart Study-Desk Posture Reminder", problemStatement: "Students studying for long hours have no gentle reminder system to correct posture and take breaks." },
    { title: "Overhead-Tank Water-Level Indicator", problemStatement: "Hostel blocks routinely overflow or run dry because tank levels aren't visible from the ground." },
    { title: "Low-Cost Air-Quality Traffic-Light", problemStatement: "Students near high-traffic gates have no simple visual cue for when outdoor air quality turns poor." },
  ],
  ediApplied: [
    { title: "Smart Attendance using Face Recognition", problemStatement: "Manual attendance in large lecture halls consumes teaching time and is easy to manipulate." },
    { title: "Campus Ride-Share Coordination App", problemStatement: "Students commuting from the same locality have no easy way to coordinate shared autos or cabs, raising costs and congestion." },
    { title: "Discreet Women's-Safety SOS Wearable", problemStatement: "Students travelling late from campus have no discreet way to alert emergency contacts if they feel unsafe." },
    { title: "Precision Irrigation Advisor for Smallholders", problemStatement: "Smallholder farmers near Pune lack an affordable tool combining soil and weather data to recommend irrigation timing." },
    { title: "Accessible Campus Navigation for the Visually Impaired", problemStatement: "Visually impaired visitors have no assistive wayfinding aid across the sprawling campus." },
    { title: "Community Health-Camp Scheduler", problemStatement: "Nearby villages struggle to learn about and register for periodic free health camps run by NGOs." },
    { title: "Smart Waste-Segregation Bin", problemStatement: "Campus waste bins are frequently mis-segregated, increasing manual sorting effort before disposal." },
    { title: "Voice-First Grievance Portal for Low Literacy", problemStatement: "Residents with limited literacy in nearby communities struggle to file civic grievances through text-only portals." },
    { title: "Energy-Use Dashboard for Hostel Blocks", problemStatement: "Hostel wardens have no visibility into which blocks are driving peak electricity demand." },
    { title: "Peer Doubt-Solving Queue System", problemStatement: "Lab sessions have long, unmanaged queues of students waiting for TA help with no visibility into wait time." },
  ],
  ediCapstone: [
    { title: "AI-Assisted Study Planner with Adaptive Scheduling", problemStatement: "Students juggling SDP, EDI and coursework have no single tool that adapts a weekly plan to shifting deadlines." },
    { title: "Predictive Maintenance for Campus Lab Equipment", problemStatement: "Lab equipment failures are discovered only after breakdown, disrupting scheduled practicals." },
    { title: "Digital Twin for Campus Energy Use", problemStatement: "Facilities staff cannot simulate the effect of equipment upgrades on overall campus energy consumption before investing." },
    { title: "Solar-Powered EV Charging Dock for Two-Wheelers", problemStatement: "Two-wheeler EV owners on campus have no dedicated, sustainably-powered charging infrastructure." },
    { title: "Regional-Language Grievance Chatbot for Local Governance", problemStatement: "Citizens more comfortable in Marathi than English are underserved by English-only grievance-redressal chatbots." },
    { title: "Blockchain-based Academic Certificate Verification", problemStatement: "Employers have no fast, tamper-proof way to verify degree certificates issued by the institute." },
    { title: "Crowd-Density Estimation for Campus Events", problemStatement: "Large campus events have no real-time way to flag dangerous crowd density near entry points." },
    { title: "Assistive Navigation Cane for Campus Wayfinding", problemStatement: "Visually impaired students need obstacle and route guidance that off-the-shelf canes don't provide on an unfamiliar campus." },
    { title: "Hyperlocal Internship Aggregator for Tier-2 Students", problemStatement: "Students outside major metros struggle to discover internships relevant to their specific skill level and location." },
    { title: "Recyclable-Packaging Redesign Sprint for Canteens", problemStatement: "Campus canteens generate significant single-use packaging waste with no low-cost recyclable alternative evaluated." },
  ],
  majorProject: [
    { title: "Explainable AI Framework for Clinical Diagnosis Support", problemStatement: "Clinicians are reluctant to trust black-box ML diagnosis tools without a clear, auditable explanation of each recommendation." },
    { title: "Federated Learning Pipeline for Multi-Hospital Data", problemStatement: "Hospitals cannot pool patient data for model training due to privacy regulation, limiting model generalizability." },
    { title: "LLM-based Financial Document Summarization Engine", problemStatement: "Analysts spend excessive time manually extracting key figures from lengthy quarterly filings." },
    { title: "Real-Time Fraud Detection for UPI Transactions", problemStatement: "Existing rule-based fraud checks are too slow to adapt to newly emerging UPI fraud patterns." },
    { title: "Autonomous Crop-Health Monitoring Drone System", problemStatement: "Smallholder farms lack an affordable, scalable way to detect crop stress across large field areas early." },
    { title: "Multilingual Speech-to-Text for Grievance Redressal", problemStatement: "Government helplines struggle to process complaints spoken in regional dialects at scale." },
    { title: "Predictive Grid-Load Balancing using Reinforcement Learning", problemStatement: "Local power-distribution utilities cannot dynamically forecast and rebalance load during demand spikes." },
    { title: "Research-Assistant Agent for Literature-Review Automation", problemStatement: "Graduate researchers spend disproportionate time manually screening papers for relevance before deep reading." },
    { title: "Vision-Language Model for Assistive Retail Navigation", problemStatement: "Visually impaired shoppers cannot independently locate and identify products in a retail aisle." },
    { title: "Blockchain-Secured Supply-Chain Provenance Tracker", problemStatement: "Consumers and auditors cannot verify provenance claims of goods across multi-tier supply chains." },
  ],
};

// ---------------------------------------------------------------------------
// Research Publication & Patent Tracking pools
// ---------------------------------------------------------------------------
export const CONFERENCE_JOURNAL_POOL = [
  { short: "ICDE-AI", name: "International Conference on Intelligent Computing & Data Engineering (ICDE-AI)", indexing: "IEEE", site: "https://icde-ai-conference.org" },
  { short: "ACI", name: "Conference on Advances in Computational Intelligence (ACI)", indexing: "Springer", site: "https://aci-springer.example-conf.org" },
  { short: "IJAER", name: "International Journal of Applied Engineering Research", indexing: "Scopus", site: "https://ijaer-journal.org" },
  { short: "ISETET", name: "International Symposium on Emerging Trends in Engineering & Technology (ISETET)", indexing: "IEEE", site: "https://isetet.org" },
  { short: "ICACIE", name: "Springer Lecture Notes in Networks and Systems — ICACIE Track", indexing: "Springer", site: "https://springer-lnns-icacie.org" },
  { short: "ICSSIT", name: "International Conference on Smart Systems and Inventive Technology (ICSSIT)", indexing: "Scopus", site: "https://icssit-conf.org" },
  { short: "TENSYMP", name: "IEEE Region Symposium on Computing & Communication (TENSYMP-style)", indexing: "IEEE", site: "https://region-tensymp.org" },
  { short: "JACHS", name: "Journal of Ambient Computing and Humanized Systems", indexing: "Scopus", site: "https://jachs-journal.org" },
  { short: "ICAISS", name: "International Conference on Artificial Intelligence & Smart Systems (ICAISS)", indexing: "IEEE", site: "https://icaiss.org" },
  { short: "AISC", name: "Springer Advances in Intelligent Systems and Computing — Student Track", indexing: "Springer", site: "https://springer-aisc-student.org" },
  { short: "NCRTE", name: "National Conference on Recent Trends in Engineering (NCRTE)", indexing: "Other", site: "https://ncrte-conf.in" },
  { short: "IJEAT", name: "International Journal of Engineering and Advanced Technology", indexing: "Scopus", site: "https://ijeat-journal.org" },
];

export const PAPER_TITLE_TEMPLATES = [
  (t) => `Design and Implementation of ${t}`,
  (t) => `${t}: A Prototype-Based Approach`,
  (t) => `Development of ${t} for Real-World Deployment`,
  (t) => `${t} — An Experimental Study`,
  (t) => `Towards Practical ${t}: Design, Implementation and Evaluation`,
  (t) => `A Novel Approach to ${t}`,
  (t) => `${t}: System Design and Field Evaluation`,
];

export const REVIEW_COMMENTS_POOL = {
  underReview: [
    "Manuscript has been assigned to reviewers; no comments yet.",
    "Under review — reviewers currently evaluating the technical contribution.",
  ],
  revision: [
    "Reviewers request a stronger related-work comparison and additional evaluation metrics.",
    "Minor revision requested: clarify the methodology section and expand the results discussion.",
    "Major revision requested: reviewers want a larger test dataset and statistical significance testing.",
    "Revise figures for clarity and address reviewer 2's concerns about reproducibility.",
  ],
  accepted: [
    "Accepted — reviewers found the contribution novel and well validated.",
    "Accepted with minor comments; incorporate suggested citations before camera-ready.",
    "Accepted — solid experimental validation and clear presentation.",
  ],
  rejected: [
    "Rejected — reviewers felt the novelty was insufficient relative to prior work.",
    "Rejected — evaluation dataset too small to support the claims made.",
    "Rejected — scope did not align with the venue; encouraged to resubmit elsewhere.",
  ],
};

export const DOCUMENT_POOL = {
  draft: "Manuscript_Draft_v1.docx",
  submission: "Submission_Confirmation.pdf",
  similarity: "Similarity_Report.pdf",
  reviewerComments: "Reviewer_Comments.pdf",
  acceptance: "Acceptance_Letter.pdf",
  rejection: "Rejection_Notification.pdf",
  cameraReady: "Camera_Ready_Manuscript.pdf",
  copyright: "Copyright_Form_Signed.pdf",
  registration: "Registration_Receipt.pdf",
  published: "Published_Paper.pdf",
};

export const CP_DESCRIPTION_TEMPLATES = [
  "Applies core concepts from the subject to design, build and evaluate a working solution over the semester.",
  "A hands-on implementation project that takes the subject's theory through requirement analysis, build and test cycles.",
  "Small-team build exploring a practical application of the subject, culminating in a demo and report.",
  "Semester-long project translating classroom concepts into a functioning prototype with a written report.",
  "Team project emphasising correct design choices, testing discipline and clear documentation.",
];