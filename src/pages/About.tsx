import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Target } from "lucide-react";
import { Helmet } from "react-helmet-async"; // ✅ SEO

// ✅ Import your images
import sharonImage from "@/assets/sharon.webp";
import elijoyImage from "@/assets/elijoy.webp";

const About = () => {
  const teamMembers = [
    {
      name: "Sharon Agigi",
      role: "Editor",
      bio: "Passionate about showcasing Kenya's vibrant creative community and cultural stories.",
      image: sharonImage,
    },
    {
      name: "Elijoy Gatwiri",
      role: "Editor",
      bio: "Dedicated to highlighting emerging artists and contemporary Kenyan art movements.",
      image: elijoyImage,
    },
  ];

  const canonicalUrl = "https://sanaathrumylens.co.ke/about";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>About Us | Sanaa Thru' My Lens</title>
        <meta
          name="description"
          content="Learn more about Sanaa Thru' My Lens – storytellers dedicated to showcasing Kenya's art, culture, and creativity through authentic narratives."
        />
        <meta
          name="keywords"
          content="Kenya art, Kenyan artists, African culture, Sanaa Thru My Lens, creative community"
        />
        <meta name="author" content="Sanaa Thru' My Lens" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="About Us | Sanaa Thru' My Lens" />
        <meta
          property="og:description"
          content="We celebrate and amplify Kenya's creative culture through authentic storytelling and visuals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://sanaathrumylens.co.ke/og-about.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Sanaa Thru' My Lens" />
        <meta
          name="twitter:description"
          content="Discover the mission and team behind Sanaa Thru' My Lens."
        />
        <meta
          name="twitter:image"
          content="https://sanaathrumylens.co.ke/og-about.jpg"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: canonicalUrl,
            name: "About Sanaa Thru' My Lens",
            description:
              "We are storytellers dedicated to showcasing Kenya's art, heritage, and creativity.",
            publisher: {
              "@type": "Organization",
              name: "Sanaa Thru' My Lens",
              logo: {
                "@type": "ImageObject",
                url: "https://sanaathrumylens.co.ke/logo.png",
              },
            },
            author: teamMembers.map((member) => ({
              "@type": "Person",
              name: member.name,
              jobTitle: member.role,
              image: `https://sanaathrumylens.co.ke${member.image}`,
              description: member.bio,
            })),
          })}
        </script>
      </Helmet>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6 text-heading">
          About Sanaa Thru' My Lens
        </h1>
        <p className="font-lora text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We are passionate storytellers dedicated to showcasing Kenya's rich
          artistic heritage and contemporary creative culture through authentic
          narratives and compelling visuals.
        </p>
      </div>

      {/* Mission */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="font-poppins font-semibold text-3xl mb-6 text-heading">
            Our Mission
          </h2>
          <p className="font-lora text-content leading-relaxed mb-6">
            Sanaa Thru' My Lens exists to celebrate, document, and amplify
            Kenya's vibrant creative ecosystem. We bridge the gap between
            traditional craftsmanship and contemporary artistic expression,
            ensuring that our cultural heritage continues to inspire future
            generations.
          </p>
          <p className="font-lora text-content leading-relaxed mb-8">
            Through in-depth profiles, cultural analysis, and visual
            storytelling, we provide a platform for both established and
            emerging artists to share their stories with local and international
            audiences.
          </p>
          <Button className="btn-hero">Get in Touch</Button>
        </div>
        <div className="relative">
          <img
            src="/api/placeholder/600/400"
            alt="Kenyan artists at work"
            className="rounded-2xl shadow-warm w-full"
          />
        </div>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="feature-card text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 text-heading">
              Excellence
            </h3>
            <p className="font-lora text-content text-sm">
              We maintain the highest standards in our storytelling, ensuring
              every article honors the artists and their craft with authenticity
              and respect.
            </p>
          </CardContent>
        </Card>

        <Card className="feature-card text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 text-heading">
              Community
            </h3>
            <p className="font-lora text-content text-sm">
              We believe in building bridges between artists, collectors, and
              art enthusiasts, fostering a supportive creative community across
              Kenya.
            </p>
          </CardContent>
        </Card>

        <Card className="feature-card text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 text-heading">
              Impact
            </h3>
            <p className="font-lora text-content text-sm">
              Our goal is to create lasting positive impact by elevating Kenyan
              art on the global stage and supporting artists in their creative
              journeys.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team */}
      <div className="text-center mb-12">
        <h2 className="font-poppins font-semibold text-3xl mb-6 text-heading">
          Meet Our Team
        </h2>
        <p className="font-lora text-muted-foreground max-w-2xl mx-auto">
          A diverse group of writers, photographers, and cultural enthusiasts
          united by our love for Kenyan art and creativity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16 justify-center">
        {teamMembers.map((member, index) => (
          <Card key={index} className="feature-card text-center">
            <CardContent className="p-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="font-poppins font-semibold text-lg mb-1 text-heading">
                {member.name}
              </h3>
              <p className="text-primary font-poppins font-medium text-sm mb-3">
                {member.role}
              </p>
              <p className="font-lora text-content text-sm">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
