import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden rounded-2xl mx-4 mt-6">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay - left transparent to right opaque */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/70" />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-end">
            <div className="max-w-xl text-right text-white">
              <h1 className="font-poppins font-bold text-4xl md:text-6xl leading-tight mb-6">
                Sanaa Thru' My Lens
              </h1>
              <p className="font-lora text-lg md:text-xl leading-relaxed mb-8 text-white/90">
                Exploring Kenya's vibrant art and creative culture through 
                authentic stories, emerging artists, and the rich tapestry of our cultural heritage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button className="btn-hero bg-primary hover:bg-primary/90 text-primary-foreground">
                  Read Latest Posts
                </Button>
                <Button className="btn-hero-outline border-white text-white hover:bg-white hover:text-primary">
                  Explore Categories
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