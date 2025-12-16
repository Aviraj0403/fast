export const posts = [
  {
    slug: 'time-management-tips',
    title: '7 Effective Ways to Improve Your Time Management Skills',
    excerpt:
      'Do you often feel stressed because you have too much work and not enough time in the day? The key is managing time...',
    image: '/image/Blog4-Image-750x465.jpg',
    date: 'Dec 23, 2022',
    content:
      '<p>Full article content for time management tips. Replace this with real content or fetch from an API.</p>',
  },
  {
    slug: 'top-5-law-professions',
    title: 'Top 5 Law Professions in India',
    excerpt:
      'A large number of students are choosing Career Consultant in Delhi to pursue LLB after finishing high school...',
    image: '/image/lawim.jpeg',
    date: 'Dec 22, 2022',
    content:
      '<p>Full article content for law professions. Replace this with real content or fetch from an API.</p>',
  },
  {
    slug: 'physiotherapy-career-options',
    title: 'What are the Career Options in Physiotherapy?',
    excerpt:
      'Physiotherapy is the treatment of disease, injury or deformity in any outer organ of the body through massages...',
    image: '/image/careeroption.jpeg',
    date: 'Dec 21, 2022',
    content:
      '<p>Full article content for physiotherapy careers. Replace this with real content or fetch from an API.</p>',
  },
  {
    slug: 'architect-vs-civil-engineer',
    title: 'Architect Vs. Civil Engineer: What is the Difference?',
    excerpt:
      'An architect is a professional involved in designing and planning every construction element and is responsible for the project’s aesthetic appeal...',
    image: '/image/civil.jpeg',
    date: 'Dec 20, 2022',
    content:
      '<p>Full article content comparing architect and civil engineer careers.</p>',
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}
