// components/Testimonials.tsx
'use client'

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";



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
  
  // Animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number], // ✅ cast as tuple
      },
    },
  };
  
  
  function TestimonialsSection() {
    return (
      <section className="py-20 px-6 sm:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded shadow"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.title}</p>
                <div className="flex justify-center text-yellow-500 my-2">
                  {Array(5).fill(0).map((_, i) => <Star key={i} size={16} />)}
                </div>
                <p className="text-sm italic text-gray-600">“{item.testimonial}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default TestimonialsSection