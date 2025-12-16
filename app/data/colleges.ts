export const colleges = [
  {
    slug: 'engineering-excellence-institute',
    name: 'Engineering Excellence Institute',
    location: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585',
    category: 'Engineering',
    description: 'Top engineering programs with strong industry ties.',
  },
  {
    slug: 'medical-sciences-university',
    name: 'Medical Sciences University',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd',
    category: 'Medical',
    description: 'Comprehensive medical training and research facilities.',
  },
  {
    slug: 'national-law-school',
    name: 'National Law School',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b',
    category: 'Law',
    description: 'Leading legal education and moot court programs.',
  },
];

export function getCollegeBySlug(slug: string) {
  return colleges.find((c) => c.slug === slug) || null;
}
