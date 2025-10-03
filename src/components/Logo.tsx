import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-accent-gradient rounded-lg flex items-center justify-center">
        <span className="text-accent-foreground font-poppins font-bold text-lg">
          S
        </span>
      </div>
      <span className="font-poppins font-bold text-xl text-foreground">
        Sanaa Thru' My Lens
      </span>
    </Link>
  );
};

export default Logo;
