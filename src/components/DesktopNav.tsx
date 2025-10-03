import { Link, useLocation } from "react-router-dom";

const DesktopNav = ({
  navigation,
}: {
  navigation: { name: string; href: string }[];
}) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`font-poppins font-medium transition-colors ${
            isActive(item.href)
              ? "text-primary border-b-2 border-primary"
              : "text-foreground/80 hover:text-primary"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNav;
