import Intro from '@components/Intro'
import Link from 'next/link'
import { client } from '../../tina/__generated__/client'

export default async function PostsPage() {
  const { data } = await client.queries.postConnection()

  return (
    <div className="z-10 flex flex-col w-full">
      <Intro />
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto flex flex-col">
          <main className="space-y-8 md:space-y-12 flex-1">
            <div className="grid gap-6">
              {data?.postConnection?.edges?.map(post => (
                <Link
                  key={post?.node?.id}
                  href={`/posts/${post?.node?._sys.filename}`}
                  className="block p-6 rounded-lg backdrop-blur-sm dark:bg-black/20 bg-black/5
                             transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                >
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    {post?.node?.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {post?.node?._sys.filename}
                  </p>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
