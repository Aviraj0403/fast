import BlogSection from "../sections/BlogSection";
import { FixedButtons } from "../sections/FixedButtons";

export const metadata = {
  title: "Blogs & Insights | FastAdmission AI",
  description: "Read the latest insights on career trends, college reviews, and admission tips.",
};

export default function BlogPage() {
  return (
    <main className="pt-20">
      <BlogSection />
      <FixedButtons />
    </main>
  );
}
