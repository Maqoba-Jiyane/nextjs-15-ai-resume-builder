# Eon Resume

**Eon Resume** is an AI-powered resume builder that helps users create professional resumes using prebuilt resume templates and structured forms.

Instead of manually designing a CV from scratch, users select a resume template and complete guided forms. The information entered into those forms is then used to populate the selected resume template, making it easier to build, edit, and maintain a professional resume.

AI-powered functionality enhances the resume-building experience while the template and form system keeps resume data structured and reusable.



## Core Features

- AI-powered resume building
- Prebuilt professional resume templates
- Form-driven resume creation
- Automatic population of resume templates from user-entered data
- Structured resume data
- Resume editing and updating
- Multiple template support
- User authentication with Clerk
- Persistent resume storage with MongoDB
- Database access through Prisma ORM
- Responsive web interface

## How It Works

The basic resume-building flow is:

1. A user signs in or creates an account.
2. The user creates a new resume.
3. The user selects a prebuilt resume template.
4. The user fills in structured forms containing their resume information.
5. The form data is stored in the database.
6. Eon Resume uses that data to populate the selected resume template.
7. The user can continue editing their information and previewing the resulting resume.
8. AI-powered features can assist the user during the resume-building process.

This approach separates the user's resume **content** from the resume **presentation**, allowing the same structured information to be rendered through different templates.

## Tech Stack

Eon Resume is built with:

| Technology | Purpose |
| --- | --- |
| **Next.js 15.3.8** | Full-stack React framework |
| **React 19** | User interface |
| **TypeScript 5** | Type-safe application development |
| **Prisma 6.3.1** | ORM and typed database access |
| **MongoDB** | Primary application database |
| **Clerk** | Authentication and user management |
| **Groq API** | Current AI inference provider |
| **OpenAI API** | Original AI provider used during development |
| **Tailwind CSS 3.4** | Styling |
| **React Hook Form** | Structured resume forms |
| **Zod** | Form and runtime validation |
| **Zustand** | Client-side state management |
| **dnd-kit** | Drag-and-drop and section reordering |
| **Framer Motion** | UI animation |
| **pdf-lib** | PDF generation and manipulation |
| **PDF.js / pdf-parse** | PDF parsing and reading |
| **Puppeteer Core** | Browser-based resume rendering/export workflows |
| **@sparticuz/chromium** | Serverless Chromium support |
| **Vercel Blob** | File/blob storage |
| **Nodemailer** | Email integration |
| **Svix** | Webhook handling |
| **Radix UI** | Accessible UI primitives |
| **Lucide React / React Icons** | Icons |

### Notable Package Versions

```text
Next.js             15.3.8
React               19.x
Prisma              6.3.1
Clerk               6.11.0
Tailwind CSS        3.4.1
TypeScript          5.x
React Hook Form     7.54.2
Zod                 3.24.1
Zustand             5.0.3
Puppeteer Core      24.10.0
pdf-lib             1.17.1
```

> The project still includes the `openai` package because OpenAI was the original AI integration. The current AI functionality uses Groq. If the OpenAI SDK is no longer referenced anywhere in the codebase, it can be removed from the dependencies.

## Architecture

At a high level, Eon Resume follows this flow:

```text
User
  │
  ▼
Clerk Authentication
  │
  ▼
Next.js 15 Application
  │
  ├── Resume Forms
  │       │
  │       ▼
  │   Structured Resume Data
  │
  ├── AI Resume Features
  │
  ├── Resume Templates
  │       │
  │       ▼
  │   Populated Resume
  │
  ▼
Prisma ORM
  │
  ▼
MongoDB
```

## Resume Data

Resume information is collected through structured forms.

Depending on the available template and application features, resume data can include sections such as:

- Personal details
- Contact information
- Professional title
- Professional summary
- Work experience
- Education
- Skills
- Projects
- Certifications
- Languages
- References
- Additional resume sections
- Template selection
- Resume styling preferences

The stored data can then be passed into the selected template instead of requiring users to manually recreate the content whenever the design changes.

## Project Structure

A typical project structure may look similar to:

```text
eon-resume/
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── forms/
│   │   ├── resume/
│   │   └── templates/
│   ├── lib/
│   ├── utils/
│   └── types/
├── .env
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

The exact structure may differ as the application evolves.

## Getting Started

### Prerequisites

Before running Eon Resume locally, make sure you have:

- Node.js installed
- npm, pnpm, yarn, or another supported package manager
- A MongoDB database
- A Clerk application
- The required environment variables

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd nextjs-15-ai-resume-builder
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

The project includes the following post-install step:

```json
"postinstall": "prisma generate && npx puppeteer browsers install chrome"
```

This automatically generates Prisma Client and installs Chrome for Puppeteer after dependencies are installed.

Or, using pnpm:

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` or `.env.local` file in the root of the project.

Example:

```env
DATABASE_URL="your-mongodb-connection-string"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Add the Groq API key required by the application's current AI functionality, together with any other integration-specific environment variables used by the project.

For example:

```env
GROQ_API_KEY=
```

Eon Resume originally used the OpenAI API for its AI-powered functionality, but the current implementation uses the Groq API.

Do not commit real secrets, API keys, database credentials, or Clerk secret keys to Git.

## Prisma Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Because Eon Resume uses MongoDB with Prisma, database schema changes can be synchronised using the workflow configured for the project.

For example:

```bash
npx prisma db push
```

You can inspect the database through Prisma Studio where supported:

```bash
npx prisma studio
```

## Running the Application

Start the Next.js development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Scripts

The current `package.json` defines:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "postinstall": "prisma generate && npx puppeteer browsers install chrome"
}
```

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production build

```bash
npm run build
```

Creates the production application bundle.

### Production server

```bash
npm run start
```

Starts the built Next.js application.

### Linting

```bash
npm run lint
```

Runs the project's Next.js lint command.

### Post-install setup

```bash
npm run postinstall
```

Generates Prisma Client and installs the Chrome browser required by Puppeteer.

## Authentication

Eon Resume uses **Clerk** for authentication and user management.

Authenticated users can have resume records associated with their Clerk user ID, allowing the application to restrict access to the correct owner.

Server-side authorization should always verify that the authenticated user owns the resume being requested or modified.

## Database

Eon Resume uses **MongoDB** as its primary database and **Prisma ORM** as the application's data-access layer.

Prisma provides a typed interface between the Next.js application and MongoDB.

Resume-related records can contain information such as:

```text
User
  └── Resumes
       ├── Personal Details
       ├── Experience
       ├── Education
       ├── Skills
       ├── Projects
       ├── Certifications
       ├── Template
       └── Styling
```

The actual relationships and models are defined in:

```text
prisma/schema.prisma
```

## Resume Templates

Eon Resume provides prebuilt resume templates.

Templates are responsible primarily for the presentation of resume data. The user's information comes from the structured forms and stored resume data.

Conceptually:

```text
Resume Form Data
       +
Selected Template
       │
       ▼
Rendered Resume
```

This separation makes it possible to create additional templates without requiring users to rewrite all of their resume content.

## AI-Powered Experience

Eon Resume uses AI to assist users while building and improving their resumes.

The project was originally implemented using the **OpenAI API**. The current application uses the **Groq API** for AI inference, allowing the platform to provide AI-assisted resume functionality without relying on the original OpenAI integration.

The AI layer complements the structured form and template system rather than replacing it:

```text
User Resume Data
      │
      ▼
Structured Forms
      │
      ├── Direct Resume Content
      │
      └── AI Assistance
              │
              ▼
           Groq API
              │
              ▼
       Enhanced Content
      │
      ▼
Selected Resume Template
      │
      ▼
Rendered Resume
```

Resume data remains structured and editable by the user. The AI provider is kept separate from the core resume architecture so it can be changed without redesigning the form and template system.

The `openai` npm package remains in the current dependency list from the application's earlier OpenAI-based implementation. If it is no longer imported anywhere in the project, it can safely be considered for removal after verifying the codebase.

## Supporting Libraries and Integrations

The current codebase includes libraries supporting the broader resume-building experience:

- `react-hook-form`, `@hookform/resolvers`, and `zod` for structured form handling and validation
- `@dnd-kit/*` for draggable and reorderable resume content
- `zustand` for client-side state management
- `framer-motion` for animation
- `react-color` for colour customisation
- `next-themes` for theme support
- `pdf-lib`, `pdfjs-dist`, and `pdf-parse` for PDF generation and processing
- `puppeteer-core` and `@sparticuz/chromium` for browser-based rendering and PDF/export workflows
- `react-to-print` for browser print workflows
- `@vercel/blob` for file storage
- `nodemailer` for email
- `svix` for webhook handling
- `jose` and `jsonwebtoken` for token-related functionality
- Radix UI components for accessible dialogs, menus, labels, popovers, and toasts
- `lucide-react` and `react-icons` for iconography

A package appearing in `package.json` does not necessarily mean every capability is exposed directly to end users.

## Security

Important security principles for Eon Resume include:

- Never expose Clerk secret keys in client-side code.
- Never expose database credentials.
- Keep the Groq API key and any AI-provider credentials server-side.
- Validate and sanitise user input.
- Authenticate protected routes.
- Authorise resume access on the server.
- Ensure users can only access resumes they own.
- Never rely entirely on client-side authorization.
- Validate database writes before persisting them.
- Keep environment variables outside source control.

## Development Principles

When developing Eon Resume:

1. Keep resume content separate from template presentation.
2. Treat form data as the source of truth for resume content.
3. Keep templates reusable.
4. Keep database access behind server-side logic.
5. Validate user ownership before reading or changing resume records.
6. Keep Groq credentials and AI requests secure.
7. Maintain strong TypeScript typing.
8. Test resume templates with incomplete and complete form data.
9. Test the application on both mobile and desktop layouts.
10. Run a production build before merging major changes.

## Production Build

Before deployment, run:

```bash
npm run build
```

Resolve all:

- TypeScript errors
- Next.js build errors
- Prisma errors
- MongoDB connection issues
- Clerk configuration issues
- Missing environment variables

before deploying.

## Deployment

Eon Resume can be deployed to a platform capable of running a Next.js 15 application.

Before deploying:

1. Configure the production MongoDB database.
2. Add the production `DATABASE_URL`.
3. Configure Clerk production credentials.
4. Add the required Groq API credentials.
5. Configure the production application URL.
6. Generate the Prisma Client.
7. Run a successful production build.
8. Test authentication.
9. Test resume creation and editing.
10. Test template rendering.
11. Test AI functionality.
12. Confirm that users cannot access another user's resumes.

## Potential Roadmap

Future development may include:

- Additional resume templates
- More advanced AI resume assistance
- Job-description-based resume tailoring
- ATS-focused resume optimisation
- AI-assisted professional summaries
- AI-assisted work experience descriptions
- Resume scoring
- Resume suggestions
- Template customisation
- Resume version history
- Improved resume preview
- Improved export and download functionality
- Better mobile resume editing

## Contributing

When contributing to the project:

1. Create a dedicated branch.
2. Follow the existing architecture and coding conventions.
3. Keep changes focused.
4. Test the affected resume-building workflow.
5. Run linting and a production build before opening a pull request.

Example:

```bash
git checkout -b feature/resume-improvements
```

Before submitting:

```bash
npm run lint
npm run build
```

## License

Add the appropriate licence for Eon Resume.

If Eon Resume is proprietary software, this section can instead state:

> Copyright © Eon Resume. All rights reserved. The source code and associated assets may not be copied, modified, distributed, or used without permission.

---

**Eon Resume — AI-powered resume building with structured forms and professional templates.**
