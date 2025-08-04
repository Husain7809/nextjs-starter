import Link from "next/link";
import Counter from "@/components/Counter";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Next.js Starter with RTK Query
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A modern Next.js application with Redux Toolkit Query for efficient API management, 
            featuring authentication, user management, and integration with the DummyJSON API for real data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* RTK Query Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">RTK Query + DummyJSON</h3>
            <p className="text-gray-600 mb-4">
              Real API integration with DummyJSON for users data, featuring search, filtering, and pagination with automatic caching.
            </p>
            <Link 
              href="/users" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse Users
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Authentication Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Authentication</h3>
            <p className="text-gray-600 mb-4">
              Real authentication with DummyJSON API, JWT tokens, and session management. Try with demo credentials provided.
            </p>
            <Link 
              href="/auth/login" 
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Try Login
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Real Data Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real API Data</h3>
            <p className="text-gray-600 mb-4">
              Connected to DummyJSON API with 208+ real user records, complete with profiles, companies, and detailed information.
            </p>
            <a 
              href="https://dummyjson.com/users" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              View API Docs
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">✨ What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>RTK Query with real DummyJSON API</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>User search & filtering functionality</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Pagination with 208+ user records</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>JWT Authentication & session management</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Automatic caching & background updates</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>TypeScript types for all API responses</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Feature-based folder organization</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Modern UI with Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Redux Counter Demo</h2>
          <p className="text-gray-600 text-center mb-6">
            This demonstrates basic Redux state management alongside RTK Query.
          </p>
          <div className="flex justify-center">
            <Counter />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Quick Start</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/users" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse 208+ Users
            </Link>
            <Link 
              href="/auth/login" 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Authentication
            </Link>
            <Link 
              href="/counter" 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Redux Demo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
