export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorName: string;
  authorId: string;
  categories: string[];
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  views: number;
  featured: boolean;
  sponsored: boolean;
  slug: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Renaissance of Kenyan Contemporary Art",
    excerpt: "Exploring how young Kenyan artists are redefining contemporary art by blending traditional techniques with modern themes, creating a unique artistic voice that speaks to both local and global audiences.",
    content: "The contemporary art scene in Kenya is experiencing a remarkable renaissance...",
    featuredImage: "/api/placeholder/800/600",
    authorName: "Amina Wanjiku",
    authorId: "author1",
    categories: ["Contemporary Art", "Culture"],
    tags: ["kenyan-art", "contemporary", "artists", "culture"],
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
    likes: 45,
    views: 1250,
    featured: true,
    sponsored: false,
    slug: "kenyan-contemporary-art-renaissance",
    status: "published",
    seoTitle: "The Renaissance of Kenyan Contemporary Art - Sanaa Thru' My Lens",
    seoDescription: "Discover how young Kenyan artists are reshaping contemporary art by blending traditional and modern techniques in our latest cultural exploration.",
    seoKeywords: "kenyan art, contemporary art, african artists, kenya culture, modern art"
  },
  {
    id: "2", 
    title: "Traditional Pottery: Keeping Ancient Crafts Alive",
    excerpt: "Meet the master potters of rural Kenya who are preserving centuries-old techniques while mentoring the next generation of ceramic artists.",
    content: "In the red clay hills outside Nairobi, master potter Grace Njeri carefully shapes...",
    featuredImage: "/api/placeholder/800/600",
    authorName: "David Kimani",
    authorId: "author2", 
    categories: ["Traditional Crafts", "Heritage"],
    tags: ["pottery", "traditional-crafts", "heritage", "ceramics"],
    publishedAt: new Date("2024-01-20"),
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-20"),
    likes: 32,
    views: 890,
    featured: false,
    sponsored: true,
    slug: "traditional-pottery-ancient-crafts",
    status: "published",
    seoTitle: "Traditional Pottery: Preserving Kenyan Ancient Crafts",
    seoDescription: "Learn about Kenya's master potters who preserve ancient ceramic techniques while training new generations of artists.",
    seoKeywords: "kenyan pottery, traditional crafts, ceramic art, cultural heritage, african pottery"
  },
  {
    id: "3",
    title: "Street Art Revolution in Nairobi",
    excerpt: "How Nairobi's vibrant street art scene is transforming neighborhoods and giving voice to social issues through powerful murals and installations.",
    content: "The walls of Nairobi tell stories. From Kibera to Westlands, street artists...",
    featuredImage: "/api/placeholder/800/600",
    authorName: "Sarah Muthoni",
    authorId: "author3",
    categories: ["Street Art", "Social Commentary"],
    tags: ["street-art", "nairobi", "murals", "social-issues"],
    publishedAt: new Date("2024-01-25"),
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-25"),
    likes: 67,
    views: 1450,
    featured: true,
    sponsored: false,
    slug: "nairobi-street-art-revolution",
    status: "published", 
    seoTitle: "Street Art Revolution in Nairobi - Urban Culture Transformation",
    seoDescription: "Explore Nairobi's dynamic street art scene and how artists use murals to address social issues and transform communities.",
    seoKeywords: "nairobi street art, kenyan murals, urban art, african street art, social commentary"
  },
  {
    id: "4",
    title: "The Sound of Kenya: Modern Music Meets Traditional Rhythms",
    excerpt: "Discover how contemporary Kenyan musicians are innovating by incorporating traditional instruments and rhythms into modern genres.",
    content: "The nyatiti, an ancient Luo string instrument, resonates through the studio...",
    featuredImage: "/api/placeholder/800/600",
    authorName: "Michael Ochieng",
    authorId: "author4",
    categories: ["Music", "Culture Fusion"],
    tags: ["kenyan-music", "traditional-instruments", "modern-music", "fusion"],
    publishedAt: new Date("2024-02-01"),
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-02-01"),
    likes: 28,
    views: 720,
    featured: false,
    sponsored: false,
    slug: "kenya-music-traditional-modern-fusion",
    status: "published",
    seoTitle: "Modern Kenyan Music Meets Traditional Rhythms - Cultural Fusion",
    seoDescription: "How contemporary Kenyan musicians blend traditional instruments with modern sounds to create innovative musical experiences.",
    seoKeywords: "kenyan music, traditional instruments, music fusion, african music, contemporary culture"
  },
  {
    id: "5",
    title: "Emerging Fashion Designers Redefining African Elegance",
    excerpt: "Meet the young fashion designers who are putting Kenya on the global fashion map with their innovative designs inspired by African heritage.",
    content: "In a small studio in Industrial Area, fashion designer Lynette Wanjiru...",
    featuredImage: "/api/placeholder/800/600", 
    authorName: "Grace Akinyi",
    authorId: "author5",
    categories: ["Fashion", "Design"],
    tags: ["kenyan-fashion", "african-elegance", "designers", "fashion-week"],
    publishedAt: new Date("2024-02-05"),
    createdAt: new Date("2024-02-02"),
    updatedAt: new Date("2024-02-05"),
    likes: 51,
    views: 1100,
    featured: true,
    sponsored: false,
    slug: "kenyan-fashion-designers-african-elegance",
    status: "published",
    seoTitle: "Emerging Kenyan Fashion Designers Redefining African Elegance",
    seoDescription: "Discover how young Kenyan fashion designers are making global waves with heritage-inspired contemporary designs.",
    seoKeywords: "kenyan fashion, african designers, contemporary fashion, african elegance, fashion design"
  },
  {
    id: "6",
    title: "Digital Art and NFTs: Kenya's Creative Tech Revolution", 
    excerpt: "How Kenyan digital artists are embracing new technologies like NFTs and AI to create groundbreaking art that bridges traditional and digital worlds.",
    content: "The intersection of technology and creativity has never been more exciting in Kenya...",
    featuredImage: "/api/placeholder/800/600",
    authorName: "Brian Njoroge",
    authorId: "author6",
    categories: ["Digital Art", "Technology"],
    tags: ["digital-art", "nfts", "technology", "innovation"],
    publishedAt: new Date("2024-02-10"),
    createdAt: new Date("2024-02-07"),
    updatedAt: new Date("2024-02-10"),
    likes: 39,
    views: 950,
    featured: false,
    sponsored: true,
    slug: "kenya-digital-art-nfts-tech-revolution",
    status: "published",
    seoTitle: "Digital Art and NFTs: Kenya's Creative Technology Revolution",
    seoDescription: "Explore how Kenyan digital artists are pioneering new forms of creative expression through NFTs and digital technologies.",
    seoKeywords: "kenyan digital art, nfts kenya, creative technology, digital artists, blockchain art"
  }
];

export const trendingPosts = mockPosts
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

export const featuredPosts = mockPosts.filter(post => post.featured);

export const categories = [
  "Contemporary Art",
  "Traditional Crafts", 
  "Street Art",
  "Music",
  "Fashion",
  "Digital Art",
  "Heritage",
  "Culture Fusion",
  "Social Commentary",
  "Design",
  "Technology"
];