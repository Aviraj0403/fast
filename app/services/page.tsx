import { AIServicesSection } from "../sections/AIServicesSection";
import { AdmissionSection } from "../sections/AdmissionSection";
import { StudyGoalSection } from "../sections/StudyGoalSection";
import { FixedButtons } from "../sections/FixedButtons";

export const metadata = {
    title: "Our Services | FastAdmission AI",
    description: "Explore our AI-powered admission services, study planning, and career guidance.",
};

export default function ServicesPage() {
    return (
        <main className="pt-20">
            <AIServicesSection />
            <AdmissionSection />
            <StudyGoalSection />
            <FixedButtons />
        </main>
    );
}
