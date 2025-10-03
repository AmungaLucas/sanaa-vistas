import SEO from "@/components/SEO";

const AuthLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-muted/20 to-background">
      <SEO
        title={title}
        description={description}
        keywords="login, sign up, authentication, sanaa scope"
        url={`${window.location.origin}/auth`}
        image={`${window.location.origin}/placeholder.svg`}
      />
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
