import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-earth-brown text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-poppins font-bold text-xl">
                  S
                </span>
              </div>
              <span className="font-poppins font-bold text-2xl">
                Sanaa Thru' My Lens
              </span>
            </div>
            <p className="text-primary-foreground/80 font-lora leading-relaxed mb-6 max-w-md">
              Exploring Kenya's vibrant art and creative culture through
              authentic stories, emerging artists, and the rich tapestry of our
              cultural heritage.
            </p>
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                className="p-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-earth-brown"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="p-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-earth-brown"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="p-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-earth-brown"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="p-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-earth-brown"
              >
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <nav className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Categories", href: "/categories" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground font-lora transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 font-lora">
                  info@sanaathrumylens.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 font-lora">
                  +254 720 649 974
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 font-lora">
                  Nairobi, Kenya
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 font-lora text-sm">
            © 2025 Sanaa Thru' My Lens. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 font-lora text-sm mt-2 md:mt-0">
            Billuc Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
