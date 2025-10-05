// app/(marketing)/_components/TrustLogosAnimated.tsx
"use client";
import Image from "next/image";
import { m as motion, useReducedMotion } from "framer-motion";

export default function TrustLogosAnimated({
  logos,
}: {
  logos: { src: string; alt: string }[];
}) {
  const reduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };
//   const item = {
//     hidden: { opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.98 },
//     show: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.45, ease: "easeOut" },
//     },
//   };

  return (
    <motion.div
      variants={container}
      initial="show"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-90"
    >
      {logos.map((l, i) => (
        <motion.div
          key={i}
        //   variants={item}
          whileHover={reduce ? {} : { y: -2, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="rounded-md px-2 py-1 ring-1 ring-gray-200/60 bg-white/60 backdrop-blur-[1px]"
        >
          <Image
            src={l.src}
            alt={l.alt}
            width={110}
            height={30}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
