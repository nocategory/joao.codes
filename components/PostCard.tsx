import Link from 'next/link'

export const PostCard = ({ post }) => {
  console.log('this post', post)
  return (
    <Link
      key={post?.id}
      href={`/posts/${post?._sys.filename}`}
      className="block p-6 rounded-lg backdrop-blur-sm dark:bg-black/20 bg-black/5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg mt-5 mb-5 relative"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-2">{post?.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {post?.description}
      </p>
      <h4 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {new Date(post?.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        })}
      </h4>
    </Link>
  )
}

export default PostCard
