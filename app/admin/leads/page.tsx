import Link from 'next/link';

export default function LeadsPage() {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || '';

  return (
    <main className="p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Leads / Enquiries</h1>
        <p className="text-sm text-gray-600 mb-6">
          Leads are managed in the external backend. Use your NestJS admin dashboard to view and manage enquiries.
        </p>

        {adminUrl ? (
          <div className="space-y-4">
            <a href={adminUrl} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Open Admin Dashboard
            </a>
            <p className="text-xs text-gray-500">If this link is not set, configure `NEXT_PUBLIC_ADMIN_URL` in your environment.</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-500">No external admin URL configured. Set `NEXT_PUBLIC_ADMIN_URL` to point to your NestJS admin UI.</p>
            <div className="mt-4">
              <Link href="/" className="text-blue-600 hover:underline">Back to site</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
