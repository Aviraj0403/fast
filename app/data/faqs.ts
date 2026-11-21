export type Faq = { q: string; a: string };

/** Honest answers only: no guarantees we cannot keep. `{city}` is replaced on city pages. */
export const faqs = (city?: string): Faq[] => {
  const where = city ? ` in ${city}` : "";
  return [
    { q: `Is the first counselling session free?`, a: "Yes. Your first counselling session is free. We look at your marks, entrance scores, budget and goals and tell you which options are realistic." },
    { q: `Which courses do you guide for${where}?`, a: `We guide admissions to Engineering (B.Tech), Medical (MBBS, BDS), Management (MBA, BBA), Law (LLB), Commerce, Arts and Mass Communication courses${where ? `, including colleges in and around ${city}` : " across India"}.` },
    { q: "How does the admission process work with FastAdmission?", a: "1) A free counselling call to understand your profile. 2) A shortlist of suitable colleges with fees and cutoffs. 3) Help with forms, documents and deadlines. 4) Support until your seat is confirmed." },
    { q: city ? `Can I get counselling if I do not live in ${city}?` : "Can students outside Bihar use your service?", a: "Yes. Counselling works over phone, WhatsApp and video call, so students and parents anywhere in India can use it." },
    { q: "Which documents do I usually need?", a: "Class 10 and 12 marksheets, entrance exam scorecard (JEE, NEET, CUET and others where required), ID proof, passport-size photographs, and a category or domicile certificate if applicable. Each college lists its exact requirements and we share the checklist with you." },
    { q: "When should I start?", a: "As early as possible. Many applications and counselling rounds have fixed dates, so starting before your results are out gives you time to compare options calmly." },
    { q: "Do you guarantee admission?", a: "No one can honestly guarantee a seat. Admission depends on your marks, entrance rank and seat availability. We help you choose realistic colleges and complete every step correctly so you do not lose a seat to a mistake or a missed date." },
  ];
};

export const faqJsonLd = (list: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
