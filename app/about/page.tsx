import { AIAboutSection } from "../sections/AIAboutSection";
import { FixedButtons } from "../sections/FixedButtons";

export const metadata = {
  title: "About Us | FastAdmission AI",
  description: "Learn about FastAdmission's mission to revolutionize career counseling with AI technology.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      <AIAboutSection />
      <FixedButtons />
    </main>
  );
}
