import { AIAssessmentSection } from "../sections/AIAssessmentSection";
import CareerAssessmentSection from "../sections/CareerAssessmentSection";
import { FixedButtons } from "../sections/FixedButtons";

export const metadata = {
    title: "AI Career Assessment | FastAdmission AI",
    description: "Take our free AI career assessment and discover your perfect career path.",
};

export default function AssessmentPage() {
    return (
        <main className="pt-20">
            <AIAssessmentSection />
            <CareerAssessmentSection />
            <FixedButtons />
        </main>
    );
}
