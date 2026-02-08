# OpenCareer

A web application that helps users discover career paths by analyzing their resume. Upload your PDF or DOC resume and get personalized career role suggestions. Upload a PDF or DOC file, and OpenCareer extracts skills and suggests relevant roles with clear explanations based on actual skills.

## Features

- **File Upload**: Drag-and-drop or button upload for PDF and DOC/DOCX files
- **Skill Extraction**: Keyword-based pattern matching to identify 160+ technical and soft skills
- **Career Matching**: Suggests 20+ tech roles based on skill matches (50% minimum threshold)
- **Interactive Results**: Remove skills to see updated role suggestions in real-time
- **Modern UI**: Clean, responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **File Parsing**: pdf-parse (PDF), mammoth (DOC/DOCX)
- **Deployment**: Ready for Vercel, Netlify, or any Node.js platform

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
career-builder/
├── app/
│   ├── api/
│   │   ├── upload/route.ts      # File upload and parsing endpoint
│   │   └── analyze/route.ts     # Skills extraction and matching endpoint
│   ├── results/page.tsx         # Results page with sidebar layout
│   ├── page.tsx                 # Upload page (home)
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── FileUpload.tsx           # Drag-drop upload component
│   ├── SkillsList.tsx           # Skills sidebar component
│   ├── RoleCard.tsx             # Individual role card
│   └── LoadingState.tsx         # Loading spinner
├── lib/
│   ├── parsers/
│   │   ├── pdfParser.ts         # PDF parsing
│   │   └── docParser.ts         # DOC/DOCX parsing
│   ├── data/
│   │   ├── skills.ts            # Skills dictionary (160+ skills)
│   │   └── roles.ts             # Role definitions (20 roles)
│   ├── skillExtractor.ts        # Keyword matching logic
│   └── rolesMatcher.ts          # Role matching algorithm
└── types/
    └── index.ts                 # TypeScript type definitions
```

## How It Works

1. **Upload**: User uploads a resume (PDF or DOC/DOCX, max 10MB)
2. **Parse**: File is parsed to extract text content
3. **Extract**: Keyword matching identifies skills from a dictionary of 160+ skills
4. **Match**: Roles are matched based on skill overlap (50% minimum threshold)
5. **Display**: Results show matched skills with explanations
6. **Refine**: Users can remove skills to see updated role suggestions

## Skills Database

The app recognizes:
- Programming languages (JavaScript, Python, Java, etc.)
- Frontend frameworks (React, Vue, Angular, etc.)
- Backend frameworks (Node.js, Django, Flask, etc.)
- Databases (SQL, PostgreSQL, MongoDB, etc.)
- DevOps tools (Docker, Kubernetes, AWS, etc.)
- Design tools (Figma, Sketch, Adobe XD, etc.)
- Soft skills (Leadership, Communication, Agile, etc.)

## Role Database

Includes 20 common tech roles:
- Full Stack Developer
- Frontend Engineer
- Backend Engineer
- DevOps Engineer
- Data Engineer
- Mobile Developer
- QA Engineer
- Site Reliability Engineer
- Cloud Engineer
- Security Engineer
- Machine Learning Engineer
- Data Scientist
- Product Manager
- Engineering Manager
- UX/UI Designer
- Technical Writer
- Solutions Architect
- Database Administrator
- System Administrator
- Software Engineer

## Matching Algorithm

- Calculates percentage of role's required skills that the user possesses
- Only displays roles with ≥50% match
- Sorts results by match percentage (highest first)
- Shows which specific skills match each role

## Future Enhancements

- Optional AI-based skill extraction (user provides API key)
- Manual skill addition
- Save analysis results
- Export results as PDF
- Multi-language support
- Non-tech roles
