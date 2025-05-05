import Intro from '@components/Intro'
import IntroText from '@components/IntroText'
import PostCard from '@components/PostCard'
import '@fontsource/inter'
import client from 'tina/__generated__/client'

const getPosts = async () => {
  const { data } = await client.queries.postConnection()
  const posts = data?.postConnection?.edges?.slice(0, 3).map(edge => edge?.node)
  return posts
}

export default async function IndexPage() {
  const posts = await getPosts() || []

  return (
    <>
      <Intro />
      <div className="md:p-7 sm:p-10 pl-5 pr-5">
        <IntroText />
        <div className="max-w-3xl m-auto">
          <h2 className="text-2xl mt-10 mb-5">Recent posts</h2>
          {posts?.length > 0 ? (
            posts?.map(post => <PostCard key={post?.id} post={post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </>
  )
}
