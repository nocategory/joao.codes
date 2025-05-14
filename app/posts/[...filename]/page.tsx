import client from '../../../tina/__generated__/client'
import Post from './client-page'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Promise<any>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  const pages = await client.queries.postConnection()
  const paths =
    pages.data?.postConnection?.edges?.map(edge => ({
      filename: edge?.node?._sys.breadcrumbs,
    })) || []

  return paths
}

export default async function PostPage({
  params,
}: Props): Promise<JSX.Element> {
  const { filename } = await params
  const relativePath = filename?.join('/') + '.md'
  const data = await client.queries.post({
    relativePath,
  })

  return <Post {...data} />
}
