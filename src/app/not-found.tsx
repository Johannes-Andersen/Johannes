const NotFound = () => (
  <main className="grid min-h-screen place-items-center bg-white dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold text-brand-600">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        Houston, we&apos;ve got a problem!
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-100">
        Our trusty space explorer couldn&apos;t locate the cosmic destination
        you seek.
      </p>
      <p className="text-base leading-7 text-gray-600 dark:text-gray-100">
        Fear not, intrepid adventurer!
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/"
          className="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Warp speed to home base! 🌟
        </a>
      </div>
    </div>
  </main>
)

export default NotFound
