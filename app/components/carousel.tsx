import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Carousel() {
    // Placeholder images for the carousel (add your actual images later)
    const carouselImages = [
        '/carousel-02.webp',
        '/carousel-01.jpg',
        '/carousel-03.webp',
        '/carousel-02.jpg',
        '/trailer-truck.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically rotate the carousel images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [carouselImages.length]);

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Carousel Image */}
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
                <Image
                    src={carouselImages[currentIndex]}
                    alt={`Carousel Image ${currentIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-500 ease-in-out"
                />
            </div>

            {/* Carousel Controls */}
            <div className="absolute inset-0 flex justify-between items-center z-10">
                <button
                    onClick={() => setCurrentIndex((currentIndex - 1 + carouselImages.length) % carouselImages.length)}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full ml-4 hover:bg-opacity-75"
                >
                    &#10094; {/* Left arrow */}
                </button>
                <button
                    onClick={() => setCurrentIndex((currentIndex + 1) % carouselImages.length)}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full mr-4 hover:bg-opacity-75"
                >
                    &#10095; {/* Right arrow */}
                </button>
            </div>
        </div>
    );
}
