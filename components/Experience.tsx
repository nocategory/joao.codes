import { DownloadIcon } from '@heroicons/react/outline'

export const Experience = () => {
  return (
    <section>
      <div className="max-w-3xl mt-10 mx-auto flex flex-col space-y-8">
        <div className="relative group">
          <div className="absolute inset-0 backdrop-blur-lg rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
          <a
            href="/resume.pdf"
            download
            className="relative flex items-center justify-center gap-3 p-6 rounded-xl backdrop-blur-sm
                     bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10
                     shadow-lg transition-all duration-300
                     hover:bg-white/20 dark:hover:bg-black/30 hover:scale-[1.01]"
          >
            <DownloadIcon className="w-6 h-6" />
            <span className="text-lg font-medium">Download Resume</span>
          </a>
        </div>
      </div>
    </section>
  )
}
