"use client";

import { useEffect, useState } from "react";

type CarouselImage = {
  src: string;
  alt?: string;
};

type BlurCarouselProps = {
  images: CarouselImage[];
  /** Time between slides in ms */
  interval?: number;
};

export default function BlurCarousel({ images, interval = 3000 }: BlurCarouselProps) {
  // Make sure we have at least 3 slides to show
  const slides: CarouselImage[] =
    images.length >= 3
      ? images
      : Array.from({ length: 3 }, (_, i) => images[i % images.length]);

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slideCount = slides.length;

  // Auto-advance
  useEffect(() => {
    if (slideCount <= 1 || isHovered) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, interval);

    return () => clearInterval(id);
  }, [slideCount, interval, isHovered]);

  // Center slide is always the middle one in the viewport.
  const centerIndex = (current + 1) % slideCount;
  const leftIndex = current;
  const rightIndex = (current + 2) % slideCount;

  return (
    <div
      className="carousel-container carousel-fade-edges"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${current * (100 / 3)}%)`,
        }}
      >
        {slides.map((image, index) => {
          const isCenter = index === centerIndex;
          const isSide = index === leftIndex || index === rightIndex;

          return (
            <div className="carousel-slide" key={`${image.src}-${index}`}>
              <div
                className={`slide-inner ${
                  isCenter ? "slide-center" : isSide ? "slide-side" : "slide-hidden"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt ?? `Slide ${index + 1}`}
                  className="slide-image"
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          overflow: hidden;
          padding: 1.5rem 0;
        }

        .carousel-track {
          display: flex;
          transition: transform 600ms ease-out;
          will-change: transform;
        }

        .carousel-slide {
          flex: 0 0 33.3333%;
          box-sizing: border-box;
          padding: 0 0.75rem;
        }

        .slide-inner {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          transform-origin: center center;
          transition:
            transform 400ms ease,
            filter 400ms ease,
            opacity 400ms ease;
        }

        .slide-image {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
        }

        /* Center image: sharp and full opacity */
        .slide-center {
          filter: none;
          transform: scale(1);
          opacity: 1;
        }

        /* Edge images: slightly smaller + blur = "half blurred" look */
        .slide-side {
          filter: blur(2px);
          transform: scale(0.95);
          opacity: 0.65;
        }

        /* Non-visible slides: keep them hidden but in the track */
        .slide-hidden {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.9);
          filter: blur(4px);
        }

        /* Soft fade on left/right edges so they feel “halfway” in view */
        .carousel-fade-edges::before,
        .carousel-fade-edges::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15%;
          z-index: 5;
          pointer-events: none;
        }

        .carousel-fade-edges::before {
          left: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.35), transparent);
        }

        .carousel-fade-edges::after {
          right: 0;
          background: linear-gradient(to left, rgba(0, 0, 0, 0.35), transparent);
        }

        @media (max-width: 768px) {
          .slide-image {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
