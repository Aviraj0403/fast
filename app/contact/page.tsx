import MergedContactSection from "../sections/MergedContactSection";
import { FixedButtons } from "../sections/FixedButtons";

export const metadata = {
    title: "Contact Us | FastAdmission AI",
    description: "Get in touch with our expert counselors for personalized guidance.",
};

export default function ContactPage() {
    return (
        <main className="pt-20">
            <MergedContactSection />
            <FixedButtons />
        </main>
    );
}
