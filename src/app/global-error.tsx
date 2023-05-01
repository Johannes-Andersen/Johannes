'use client'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function GlobalError({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html className="h-full" lang="en">
      <body className={`${inter.className} h-full`}>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-brand-600">500</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Internal Server Explosion! 🌋
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Our intergalactic engine room has encountered a bit of cosmic
              chaos.
            </p>
            <p className="text-base leading-7 text-gray-600">
              The space engineers are already suiting up to fix the problem!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                onClick={() => reset()}
              >
                Give it another shot 🔄
              </button>
              <a
                href="/"
                className="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Hitch a ride back to safety! 🚀
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
