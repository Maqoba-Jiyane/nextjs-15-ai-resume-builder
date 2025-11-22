"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Paul Jacobs",
    title: "Software Engineer",
    testimonial:
      "Eon Resume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Thato Mokoena",
    title: "Software Developer",
    testimonial:
      "The resume builder on Eon Resume helped me to perfectly highlight my skills and experience, which led to multiple interview invitations.",
    image:
      "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Mahlatsi Masemula",
    title: "Marketing Intern",
    testimonial:
      "Eon Resume made my job search a lot easier! The resume builder is intuitive, and it helped me land interviews quickly.",
    image:
      "https://images.unsplash.com/photo-1531727991582-cfd25ce79613?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Zanele Ndlovu",
    title: "HR Specialist",
    testimonial:
      "I used Eon Resume to build my resume and was blown away by how easy and effective it was. It streamlined my job application process.",
    image:
      "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Aarav Patel",
    title: "Marketing Manager",
    testimonial:
      "The AI-powered resume builder is a game-changer. It saved me so much time and helped me craft the perfect resume.",
    image:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Mpho Khumalo",
    title: "UX Designer",
    testimonial:
      "Eon Resume made it so much easier for me to structure my portfolio and resume. I received great feedback from employers, thanks to its professional layout.",
    image:
      "https://images.unsplash.com/photo-1532136672867-8eff8c949b63?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Robert Brown",
    title: "Graphic Designer",
    testimonial:
      "Eon Resume helped me present my skills and experience in a more professional way, leading to several job offers.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.06,
      ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
    },
  }),
};

function TestimonialsSection() {
  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
          Testimonials
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-50 sm:text-4xl">
          What our users say
        </h2>
        <p className="mt-3 text-sm text-slate-300 sm:text-base max-w-2xl mx-auto">
          Real candidates using Eon Resume to land interviews and present
          themselves like professionals.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name + index}
              className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-left shadow-[0_18px_35px_rgba(15,23,42,0.9)]"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={cardVariants}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={52}
                  height={52}
                  className="rounded-full object-cover ring-2 ring-slate-700"
                />
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-slate-50">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400">{item.title}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-amber-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
              </div>

              <p className="mt-3 text-xs italic leading-relaxed text-slate-300 sm:text-sm">
                “{item.testimonial}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
