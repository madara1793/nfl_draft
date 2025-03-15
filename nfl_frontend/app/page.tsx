import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center max-w-4xl w-full">
        <div className="flex flex-col items-center gap-12 py-16">
          <Image
            className="dark:invert transition-transform hover:scale-110 duration-300"
            src="data:image/png;base64,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"
            alt="Next.js logo"
            width={80}
            height={80}
            priority
          />

          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Welcome to the Simulator
          </h1>

          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
            Experience the next generation of interactive simulation with our
            cutting-edge platform.
          </p>

          <a
            className="group relative overflow-hidden rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-base py-3 px-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 flex items-center gap-3"
            href="/teams"
            target="_self"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Image
              className="relative z-10 dark:invert transition-transform group-hover:rotate-12 duration-300"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={24}
              height={24}
            />
            <span className="relative z-10">Let&apos;s start Simulator</span>
          </a>
        </div>
      </main>

      <footer className="w-full text-center text-sm text-gray-500 dark:text-gray-400 mt-auto pb-6">
        © {new Date().getFullYear()} Simulator. All rights reserved.
      </footer>
    </div>
  );
}
