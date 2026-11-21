/** Cities with an admission-guidance landing page (/admission/<slug>). Add a row and the page, sitemap entry and links appear on the next build. */
export type City = { slug: string; name: string; state: string };

const c = (name: string, state: string, slug?: string): City => ({ name, state, slug: slug ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-") });

export const cities: City[] = [
  c("Delhi NCR", "Delhi", "delhi-ncr"), c("Mumbai", "Maharashtra"), c("Bangalore", "Karnataka"), c("Pune", "Maharashtra"), c("Patna", "Bihar"), c("Lucknow", "Uttar Pradesh"),
  c("Hyderabad", "Telangana"), c("Chennai", "Tamil Nadu"), c("Kolkata", "West Bengal"), c("Jaipur", "Rajasthan"), c("Bhubaneswar", "Odisha"), c("Guwahati", "Assam"),
  c("Ghaziabad", "Uttar Pradesh"), c("Noida", "Uttar Pradesh"), c("Greater Noida", "Uttar Pradesh"), c("Gurugram", "Haryana"), c("Faridabad", "Haryana"), c("Meerut", "Uttar Pradesh"),
  c("Nashik", "Maharashtra"), c("Nagpur", "Maharashtra"), c("Thane", "Maharashtra"), c("Aurangabad", "Maharashtra"), c("Jalgaon", "Maharashtra"),
  c("Ahmedabad", "Gujarat"), c("Rajkot", "Gujarat"), c("Surat", "Gujarat"), c("Vadodara", "Gujarat"),
  c("Indore", "Madhya Pradesh"), c("Bhopal", "Madhya Pradesh"), c("Gwalior", "Madhya Pradesh"), c("Jabalpur", "Madhya Pradesh"), c("Ujjain", "Madhya Pradesh"),
  c("Jodhpur", "Rajasthan"), c("Udaipur", "Rajasthan"), c("Kota", "Rajasthan"), c("Ajmer", "Rajasthan"),
  c("Chandigarh", "Chandigarh"), c("Kanpur", "Uttar Pradesh"), c("Allahabad", "Uttar Pradesh"), c("Varanasi", "Uttar Pradesh"), c("Agra", "Uttar Pradesh"), c("Aligarh", "Uttar Pradesh"),
  c("Bareilly", "Uttar Pradesh"), c("Gorakhpur", "Uttar Pradesh"), c("Moradabad", "Uttar Pradesh"), c("Saharanpur", "Uttar Pradesh"), c("Jhansi", "Uttar Pradesh"),
  c("Amritsar", "Punjab"), c("Ludhiana", "Punjab"), c("Jalandhar", "Punjab"), c("Patiala", "Punjab"), c("Bathinda", "Punjab"),
  c("Srinagar", "Jammu and Kashmir"), c("Jammu", "Jammu and Kashmir"), c("Shimla", "Himachal Pradesh"),
  c("Rohtak", "Haryana"), c("Panipat", "Haryana"), c("Karnal", "Haryana"), c("Bhiwani", "Haryana"),
  c("Ranchi", "Jharkhand"), c("Dehradun", "Uttarakhand"), c("Haridwar", "Uttarakhand"), c("Haldwani", "Uttarakhand"), c("Roorkee", "Uttarakhand"),
  c("Muzaffarpur", "Bihar"), c("Bhagalpur", "Bihar"), c("Gaya", "Bihar"), c("Darbhanga", "Bihar"),
  c("Coimbatore", "Tamil Nadu"), c("Kochi", "Kerala"), c("Visakhapatnam", "Andhra Pradesh"), c("Raipur", "Chhattisgarh"),
];

export const cityBySlug = (slug: string) => cities.find((x) => x.slug === slug);
export const sameState = (city: City, limit = 8) => cities.filter((x) => x.state === city.state && x.slug !== city.slug).slice(0, limit);
/** Local photo for the biggest cities, used as a banner. */
export const CITY_IMAGES: Record<string, string> = {
  "delhi-ncr": "/image/delhi-city.jpg", mumbai: "/image/mumbai-city.jpg", bangalore: "/image/bangalore-city.jpg", pune: "/image/pune-city.jpg", patna: "/image/patna.jpeg",
  lucknow: "/image/lucknow-city.jpg", hyderabad: "/image/hyderabad-city.jpg", chennai: "/image/chennai-city.jpg", kolkata: "/image/kolkata-city.jpg", jaipur: "/image/jaipur-city.jpg",
  bhopal: "/image/bhopal-city.jpg", indore: "/image/indore-city.jpg", chandigarh: "/image/chandigarh.jpeg",
};
