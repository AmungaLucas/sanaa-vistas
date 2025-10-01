import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/hero-1.webp";
import heroImage2 from "@/assets/hero-2.webp";
import heroImage3 from "@/assets/hero-3.webp";

const Hero = () => {
  const heroImages = [heroImage1, heroImage2, heroImage3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden rounded-2xl mx-4 mt-6">
      {/* Background Images with Transition */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/95 md:bg-gradient-to-r md:from-black/10 md:via-black/30 md:to-black/70 z-10" />

      {/* Content */}
      <div className="relative h-full flex items-end md:items-center z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-end">
            <div className="max-w-xl text-right text-white pb-8 md:pb-12">
              <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-4 md:mb-6">
                Sanaa Thru' My Lens
              </h1>
              <p className="font-lora text-sm md:text-lg leading-relaxed mb-6 md:mb-8 text-white/90">
                Exploring Kenya's vibrant art and creative culture through
                authentic stories, emerging artists, and the rich tapestry of
                our cultural heritage.
              </p>

              {/* Buttons with Links */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-end">
                <Button
                  asChild
                  className="btn-hero bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link to="/#latest-articles">Read Latest Posts</Link>
                </Button>
                <Button
                  asChild
                  className="btn-hero-outline border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/categories">Explore Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
