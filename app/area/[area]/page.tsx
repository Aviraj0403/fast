import { colleges } from '../../data/colleges';
import SEO from '../../../components/Seo';

interface Params {
  params: { area: string };
}

export default function AreaPage({ params }: Params) {
  const area = decodeURIComponent(params.area || '');
  const matches = colleges.filter((c) => c.location.toLowerCase().includes(area.toLowerCase()));

  const title = `Colleges in ${area}`;
  const description = `Discover colleges and programs in ${area}. Find top colleges by category, apply, and get counselling assistance.`;

  return (
    <>
      <SEO title={title} description={description} />
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>

          {matches.length === 0 ? (
            <p className="text-gray-500">No colleges found in this area.</p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((c) => (
                <div key={c.slug} className="bg-white rounded shadow p-4">
                  <img src={c.image} alt={c.name} className="w-full h-36 object-cover rounded" />
                  <h3 className="mt-3 font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.location} • {c.category}</p>
                  <p className="text-gray-600 mt-2">{c.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
