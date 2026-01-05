// Simple test page to check if basic styling works

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            FastAdmission AI
          </h1>
          <p className="text-xl text-blue-100 mb-8">
    y        AI-Powered Career Counseling Platform
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}