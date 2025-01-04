"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Carousel() {
  const carouselImages = [
    // '/carousel-02.webp',
    '/carousel-01.jpg',
    '/carousel-03.webp',
    // '/carousel-02.jpg',
    '/trailer-truck.jpg',
    '/g2building-01.jpg,
    '/g2building-02.jpg,
    '/g2building-03.jpg,
    '/g2truck.jpg,
    '/g2truck-01.jpeg,




    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-screen overflow-hidden">
      <Image
        src={carouselImages[currentIndex]}
        alt={`Carousel Image ${currentIndex + 1}`}
        fill
        style={{ objectFit: 'cover' }}
        className="transition-opacity duration-500 ease-in-out"
      />
      <div className="absolute inset-0 flex justify-between items-center z-10">
        <button
          onClick={() => setCurrentIndex((currentIndex - 1 + carouselImages.length) % carouselImages.length)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full ml-4 hover:bg-opacity-75"
        >
          &#10094;
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % carouselImages.length)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full mr-4 hover:bg-opacity-75"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
