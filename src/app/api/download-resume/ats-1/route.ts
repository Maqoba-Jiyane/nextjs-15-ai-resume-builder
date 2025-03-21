import { PDFDocument, PDFFont, rgb } from "pdf-lib";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import fontkit from "@pdf-lib/fontkit";

// Define the Resume and related models based on your schema
interface Resume {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  photoUrl?: string;
  colorHex: string;
  borderStyle: string;
  template: string;
  summary?: string;
  jobDescription?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  checkoutId?: string;
  paid: boolean;
  downloaded: boolean;
  downloadRequest: boolean;
  skills: string[];
  workExperiences: WorkExperience[];
  educations: Education[];
  createdAt: Date;
  updatedAt: Date;
}

interface WorkExperience {
  id: string;
  position?: string;
  company?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  description?: string;
  resumeId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Education {
  id: string;
  degree?: string;
  school?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  resumeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function POST(request: Request) {
  try {
    // Parse the resume object from the request body
    const data: { resume: Resume } = await request.json();
    const resume = data.resume;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Load the Poppins font files
    const boldPoppinsPath = path.resolve("public/Poppins-Bold.ttf");
    const boldPoppinsBytes = fs.readFileSync(boldPoppinsPath);
    pdfDoc.registerFontkit(fontkit);
    const boldPoppins = await pdfDoc.embedFont(boldPoppinsBytes);

    const regularPoppinsPath = path.resolve("public/Poppins-Regular.ttf");
    const regularPoppinsBytes = fs.readFileSync(regularPoppinsPath);
    const regularPoppins = await pdfDoc.embedFont(regularPoppinsBytes);

    // Font sizes
    const fontSize = 11;
    const headingFontSize = 14;
    const namesFontSize = 16;

    // Minimum margin from the bottom of the page
    const bottomMargin = 50;
    const leftMargin = 25

    // Add the first page
    let page = pdfDoc.addPage();
    let { width, height } = page.getSize();
    let yOffset = height - 50; // Start from the top of the page

    // Function to check if a new page is needed
    const checkForNewPage = (requiredSpace: number) => {
      if (yOffset - requiredSpace < bottomMargin) {
        // Add a new page
        page = pdfDoc.addPage();
        ({ width, height } = page.getSize());
        yOffset = height - 50; // Reset yOffset to the top of the new page
      }
    };

    // Title (Name)
    const name = `${resume.firstName} ${resume.lastName}`;
    const nameWidth = boldPoppins.widthOfTextAtSize(name, namesFontSize);
    const nameHeight = 30; // Height of the title
    checkForNewPage(nameHeight); // Check if the title fits on the current page
    page.drawText(name, {
      x: (width - nameWidth) / 2,
      y: yOffset,
      font: boldPoppins,
      size: namesFontSize,
      color: rgb(0, 0, 0),
    });
    yOffset -= nameHeight; // Move down after the title

    // Subtitle (Contact info)
    const contactInfo = `${resume.city}, ${resume.country} • ${resume.phone}`;
    const contactInfoWidth = regularPoppins.widthOfTextAtSize(contactInfo, fontSize);
    const contactInfoHeight = 20; // Height of the contact info
    checkForNewPage(contactInfoHeight); // Check if the contact info fits on the current page
    page.drawText(contactInfo, {
      x: (width - contactInfoWidth) / 2,
      y: yOffset,
      font: regularPoppins,
      size: fontSize,
      color: rgb(0, 0, 0),
      maxWidth: width - 50
    });
    yOffset -= contactInfoHeight; // Move down after the first line of contact info

    const emailAndLinkedIn = `${resume.email}`;
    const emailWidth = regularPoppins.widthOfTextAtSize(emailAndLinkedIn, fontSize);
    const emailHeight = 20; // Height of the email line
    checkForNewPage(emailHeight); // Check if the email fits on the current page
    page.drawText(emailAndLinkedIn, {
      x: (width - emailWidth) / 2,
      y: yOffset,
      font: regularPoppins,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
    yOffset -= emailHeight + 20; // Move down after the contact info

    // Section: Summary
    if (resume.summary) {
      const summaryTitle = "Summary";
      const summaryTitleHeight = 30; // Height of the summary title
      checkForNewPage(summaryTitleHeight); // Check if the summary title fits on the current page
      page.drawText(summaryTitle, {
        x: leftMargin,
        y: yOffset,
        font: boldPoppins,
        size: headingFontSize,
        color: rgb(0, 0, 0),
      });
      yOffset -= summaryTitleHeight; // Move down after the section title

      const summaryLines = wrapText(resume.summary, regularPoppins, fontSize, width - 100);
      const summaryHeight = summaryLines.length * 15; // Height of the summary text
      checkForNewPage(summaryHeight); // Check if the summary text fits on the current page
      summaryLines.forEach((line) => {
        page.drawText(line, {
          x: leftMargin,
          y: yOffset,
          font: regularPoppins,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        yOffset -= 15; // Move down after each line
      });
      yOffset -= 20; // Add extra space after the summary section
    }

    // Section: Education
    if (resume.educations && resume.educations.length > 0) {
      const educationTitle = "Education";
      const educationTitleHeight = 30; // Height of the education title
      checkForNewPage(educationTitleHeight); // Check if the education title fits on the current page
      page.drawText(educationTitle, {
        x: leftMargin,
        y: yOffset,
        font: boldPoppins,
        size: headingFontSize,
        color: rgb(0, 0, 0),
      });
      yOffset -= educationTitleHeight; // Move down after the section title

      resume.educations.forEach((education: Education) => {
        const educationText = `${education.degree}, ${education.school}`;
        const educationHeight = 15; // Height of each education entry
        checkForNewPage(educationHeight); // Check if the education entry fits on the current page
        page.drawText(educationText, {
          x: leftMargin,
          y: yOffset,
          font: regularPoppins,
          size: fontSize,
          color: rgb(0, 0, 0),
        });

        const educationDate = `${formatDate(education.startDate)} - ${formatDate(education.endDate)}`;
        const educationDateHeight = 15; // Height of each education entry
        const educationDateWidth = regularPoppins.widthOfTextAtSize(educationDate, fontSize);
        checkForNewPage(educationDateHeight); // Check if the education entry fits on the current page
        page.drawText(educationDate, {
          x: width - leftMargin - educationDateWidth,
          y: yOffset,
          font: regularPoppins,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        yOffset -= educationDateHeight; // Move down after each line
      });
      yOffset -= 20; // Add extra space after the education section
    }

    // Section: Work Experience
    if (resume.workExperiences && resume.workExperiences.length > 0) {
      const experienceTitle = "Experience";
      const experienceTitleHeight = 30; // Height of the experience title
      checkForNewPage(experienceTitleHeight); // Check if the experience title fits on the current page
      page.drawText(experienceTitle, {
        x: leftMargin,
        y: yOffset,
        font: boldPoppins,
        size: headingFontSize,
        color: rgb(0, 0, 0),
      });
      yOffset -= experienceTitleHeight; // Move down after the section title

      resume.workExperiences.forEach((experience: WorkExperience) => {
        const companyText = `${experience.company}`;
        const companyHeight = 15; // Height of the company info
        checkForNewPage(companyHeight); // Check if the company info fits on the current page
        page.drawText(companyText, {
          x: leftMargin,
          y: yOffset,
          font: boldPoppins,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        
        const position = `, ${experience.position}`;
        const positionHeight = 15; // Height of the company info
        const companyWidth = boldPoppins.widthOfTextAtSize(companyText, fontSize);
        checkForNewPage(positionHeight); // Check if the company info fits on the current page
        page.drawText(position, {
          x: companyWidth + leftMargin,
          y: yOffset,
          font: regularPoppins,
          size: fontSize,
          color: rgb(0, 0, 0),
        });

        // Draw dates
        const dateText = `${formatDate(experience.startDate)} - ${formatDate(experience.endDate)}`;
        const dateWidth = regularPoppins.widthOfTextAtSize(dateText, fontSize);
        page.drawText(dateText, {
          x: width - leftMargin - dateWidth,
          y: yOffset,
          font: regularPoppins,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        yOffset -= companyHeight + 10; // Move down after the company info

        // Draw description (if available)
        if (experience.description) {
          const descriptionLines = wrapTextDescription(experience.description.replaceAll('- ', ''), regularPoppins, fontSize, width - 100); // Split description by new lines
          const descriptionHeight = descriptionLines.length * 15; // Height of the description
          checkForNewPage(descriptionHeight); // Check if the description fits on the current page
          
          descriptionLines.forEach((line) => {
            if (line.trim() !== "") { // Skip empty lines
              page.drawText(`${line.trim().charAt(0) === line.trim().charAt(0).toUpperCase() ? `• ${line.trim()}` : `\t${line.trim()}`}`, {
                x: leftMargin + 10,
                y: yOffset,
                font: regularPoppins,
                size: fontSize,
                color: rgb(0, 0, 0),
              });
              yOffset -= 15; // Move down after each line
            }
          });
        }
        yOffset -= 20; // Add extra space after each work experience
      });
    }

    // Section: Skills
    if (resume.skills && resume.skills.length > 0) {
      const skillsTitle = "Skills";
      const skillsTitleHeight = 30; // Height of the skills title
      checkForNewPage(skillsTitleHeight); // Check if the skills title fits on the current page
      page.drawText(skillsTitle, {
        x: leftMargin,
        y: yOffset,
        font: boldPoppins,
        size: headingFontSize,
        color: rgb(0, 0, 0),
      });
      yOffset -= skillsTitleHeight; // Move down after the section title

      resume.skills.forEach((skill) => {
        const skillHeight = 15; // Height of each skill
        checkForNewPage(skillHeight); // Check if the skill fits on the current page
        page.drawText(`• ${skill}`, {
          x: leftMargin + 10,
          y: yOffset,
          font: regularPoppins,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        yOffset -= skillHeight; // Move down after each skill
      });
      yOffset -= 20; // Add extra space after the skills section
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate PDF" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Helper function to wrap text
function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = font.widthOfTextAtSize(`${currentLine} ${word}`, fontSize);
    if (width < maxWidth) {
      currentLine += ` ${word}`;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

//Helper function for descriptions
function wrapTextDescription(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
    // Split the text into lines based on newline characters
    const initialLines = text.split("\n");
  
    // Array to hold the final wrapped lines
    const wrappedLines: string[] = [];
  
    // Process each initial line
    initialLines.forEach((line) => {
      // Skip empty lines
      if (line.trim() === "") {
        wrappedLines.push(""); // Preserve empty lines
        return;
      }
  
      // Split the line into words
      const words = line.split(" ");
      let currentLine = words[0];
  
      // Wrap the line into multiple lines if necessary
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = font.widthOfTextAtSize(`${currentLine} ${word}`, fontSize);
  
        // If the current line plus the new word fits within the maxWidth, add the word
        if (width < maxWidth) {
          currentLine += ` ${word}`;
        } else {
          // Otherwise, push the current line and start a new line
          wrappedLines.push(currentLine);
          currentLine = word;
        }
      }
  
      // Push the last line
      wrappedLines.push(currentLine);
    });
  
    return wrappedLines;
  }

// Helper function to format dates
function formatDate(date?: Date | string) {
  if (!date) return "Present";

  // Convert the date to a Date object if it's a string
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) return "Present";

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}