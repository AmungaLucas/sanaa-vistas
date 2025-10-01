import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async"; // ✅ SEO

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const canonicalUrl = "https://sanaathrumylens.co.ke/contact";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Contact Us | Sanaa Thru' My Lens</title>
        <meta
          name="description"
          content="Get in touch with Sanaa Thru' My Lens. Collaborate, share your story, or ask us anything about Kenya’s vibrant art and creative culture."
        />
        <meta
          name="keywords"
          content="Contact Sanaa Thru My Lens, Kenya art blog, collaborate, partnership, creative culture"
        />
        <meta name="author" content="Sanaa Thru' My Lens" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Sanaa Thru' My Lens" />
        <meta
          property="og:description"
          content="Reach out to Sanaa Thru' My Lens for collaborations, stories, and inquiries about Kenya’s creative culture."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://sanaathrumylens.co.ke/og-contact.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Sanaa Thru' My Lens" />
        <meta
          name="twitter:description"
          content="We’d love to hear from you! Get in touch with Sanaa Thru' My Lens."
        />
        <meta
          name="twitter:image"
          content="https://sanaathrumylens.co.ke/og-contact.jpg"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: canonicalUrl,
            name: "Contact Sanaa Thru' My Lens",
            description:
              "Contact Sanaa Thru' My Lens to collaborate, share your story, or ask questions about Kenyan art and culture.",
            publisher: {
              "@type": "Organization",
              name: "Sanaa Thru' My Lens",
              logo: {
                "@type": "ImageObject",
                url: "https://sanaathrumylens.co.ke/logo.png",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+254 720 649 974",
                  contactType: "Customer Service",
                  areaServed: "KE",
                  availableLanguage: ["English", "Swahili"],
                  email: "info@sanaathrumylens.com",
                },
              ],
            },
          })}
        </script>
      </Helmet>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6 text-heading">
          Get in Touch
        </h1>
        <p className="font-lora text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Have a story to share? Want to collaborate? We'd love to hear from
          you. Reach out and let's explore Kenya's creative culture together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="feature-card">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl text-heading">
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-poppins font-medium text-sm text-foreground mb-2"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="font-lora"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-poppins font-medium text-sm text-foreground mb-2"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="font-lora"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block font-poppins font-medium text-sm text-foreground mb-2"
                >
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="font-lora"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-poppins font-medium text-sm text-foreground mb-2"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="font-lora"
                  placeholder="Tell us your story, ask your questions, or share your ideas..."
                />
              </div>

              <Button type="submit" className="btn-hero w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="font-poppins text-xl text-heading">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-poppins font-medium text-foreground mb-1">
                    Email Us
                  </h3>
                  <p className="font-lora text-muted-foreground">
                    info@sanaathrumylens.com
                  </p>
                  <p className="font-lora text-muted-foreground text-sm">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-poppins font-medium text-foreground mb-1">
                    Call Us
                  </h3>
                  <p className="font-lora text-muted-foreground">
                    +254 720 649 974
                  </p>
                  <p className="font-lora text-muted-foreground text-sm">
                    Mon - Fri, 9:00 AM - 5:00 PM EAT
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardContent className="p-6">
              <h3 className="font-poppins font-semibold text-lg text-heading mb-4">
                Collaborate With Us
              </h3>
              <p className="font-lora text-content text-sm mb-4">
                Are you an artist, curator, or cultural enthusiast? We're always
                looking for passionate collaborators to help us tell Kenya's
                creative stories.
              </p>
              <Button className="btn-accent w-full">
                Partnership Opportunities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
