import Intro from '@components/Intro'
import PostCard from '@components/PostCard'
import { client } from '../../tina/__generated__/client'

const getPosts = async () => {
  const { data } = await client.queries.postConnection()
  const posts = data?.postConnection?.edges?.map(edge => edge?.node)
  return posts
}

export default async function PostsPage() {
  const posts = await getPosts() || []

  return (
    <div className="z-10 flex flex-col w-full">
      <Intro />
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto flex flex-col">
          <main className="space-y-8 md:space-y-12 flex-1">
            <header className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-16 md:pt-12">
              <div className="flex-1">
                <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
                  Posts
                </h1>
              </div>
            </header>
            <div className="grid gap-6">
              {posts?.length > 0 ? (
                posts?.map(post => <PostCard key={post?.id} post={post} />)
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
