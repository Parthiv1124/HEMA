import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-6xl font-extrabold text-navy-900">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <Link
        href="/"
        className="rounded-full bg-brand-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
      >
        Go Home
      </Link>
    </main>
  )
}
