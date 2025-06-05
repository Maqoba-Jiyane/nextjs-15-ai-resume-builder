import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star } from "lucide-react";
import HelpCenter from "./(main)/help-center/page";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import Pricing from "@/components/Pricing";
import WhyChooseUs from "@/components/WhyChooseUs";

const testimonials = [
  {
    name: "Olivia Jacobs",
    title: "Software Engineer",
    testimonial:
      "Eon Resume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Thato Mokoena",
    title: "Software Developer",
    testimonial:
      "The resume builder on Eon Resume helped me to perfectly highlight my skills and experience, which led to multiple interview invitations.",
    image:
      "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mahlatsi Masemula",
    title: "Marketing Intern",
    testimonial:
      "Eon Resume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
    image:
      "https://images.unsplash.com/photo-1531727991582-cfd25ce79613?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Zanele Ndlovu",
    title: "HR Specialist",
    testimonial:
      "I used Eon Resume to build my resume and was blown away by how easy and effective it was. It streamlined my job application process.",
    image:
      "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Aarav Patel",
    title: "Marketing Manager",
    testimonial:
      "The AI-powered resume builder is a game-changer. It saved me so much time and helped me craft the perfect resume.",
    image:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mpho Khumalo",
    title: "UX Designer",
    testimonial:
      "Eon Resume made it so much easier for me to structure my portfolio and resume. I received great feedback from employers, thanks to its professional layout.",
    image:
      "https://images.unsplash.com/photo-1532136672867-8eff8c949b63?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Robert Brown",
    title: "Graphic Designer",
    testimonial:
      "Eon Resume helped me present my skills and experience in a more professional way, leading to several job offers.",
    image:
      "https://images.unsplash.com/flagged/photo-1552054814-8c580ce130d1?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default async function Home() {
  const cookieStore = await cookies();
  const refCode = cookieStore.get("refCode")?.value;
  const { userId } = await auth();
  console.log(userId);

  if (refCode && userId) {
    try {
      await fetch(
        "https://d283-197-185-165-12.ngrok-free.app/api/set-referral",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refCode }),
        },
      );

      // Optional: remove the cookie so you don’t send it again
    } catch (err) {
      console.error("Failed to send refCode:", err);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 text-gray-900 text-center md:text-start lg:gap-12">
      {/* Main Content */}
      <div className="flex items-center max-md:flex-col">
        <div className="max-w-prose flex flex-col justify-center items-center max-sm:pb-44 max-sm:pt-36">
          <Image alt="logo" src={"/assets/logo.png"} width={500} height={500} />
          <div>
            <Button asChild size="lg" variant="premium">
              <Link href="/resumes">Get started</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12 max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.title}</p>
              <p className="flex justify-center text-yellow-500">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </p>
              <p className="text-lg text-gray-700 italic">
                {testimonial.testimonial}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 max-sm:mx-6">
        <Pricing />
        <WhyChooseUs />
        <HelpCenter />
      </div>
    </main>
  );
}
