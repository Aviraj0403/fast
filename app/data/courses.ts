export interface Course {
  slug: string;
  title: string;
  category: "Engineering" | "Medical" | "Management" | "Law" | "Arts";
  description: string;
  duration: string;
  eligibility: string;
  image: string;
}

export const courses: Course[] = [
  {
    slug: "btech-computer-science",
    title: "B.Tech in Computer Science",
    category: "Engineering",
    description: "Prepare for the future with our comprehensive Computer Science program, focusing on AI, Cloud Computing, and Software Engineering.",
    duration: "4 Years",
    eligibility: "10+2 with PCM (Minimum 60%)",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  },
  {
    slug: "mbbs",
    title: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    category: "Medical",
    description: "Kickstart your medical career with top-tier clinical training and research opportunities in leading medical colleges.",
    duration: "5.5 Years",
    eligibility: "10+2 with PCB + NEET Qualification",
    image: "https://images.unsplash.com/photo-1538108197794-27806f3747aa",
  },
  {
    slug: "mba-finance",
    title: "MBA in Finance",
    category: "Management",
    description: "Master the world of finance and business strategy with our industry-aligned MBA program.",
    duration: "2 Years",
    eligibility: "Graduation (Any Stream) + Entrance Exam",
    image: "https://images.unsplash.com/photo-1454165833767-13a6d4b240df",
  },
  {
    slug: "llb",
    title: "Bachelor of Laws (LLB)",
    category: "Law",
    description: "Develop a strong foundation in legal studies and advocacy at India's premier law schools.",
    duration: "3 - 5 Years",
    eligibility: "10+2 or Graduation",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug) || null;
}
