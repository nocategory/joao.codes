'use client'
import React from 'react'
import { tinaField, useTina } from 'tinacms/dist/react'
import ModeToggle from '../../../components/ModeToggle'
import { PostQuery } from '../../../tina/__generated__/types'
import Image from 'next/image'

interface ClientPageProps {
  query: string
  variables: {
    relativePath: string
  }
  data: PostQuery
}

export default function Post(props: ClientPageProps) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const renderRichText = (node: any) => {
    if (node.type === 'text') {
      return node.text
    }
    console.log('Node:', node)

    const children = node.children?.map((child: any, i: number) => (
      <React.Fragment key={i}>{renderRichText(child)}</React.Fragment>
    ))

    switch (node.type) {
      case 'h1':
        return <h1 className="text-3xl font-bold my-4">{children}</h1>
      case 'h2':
        return <h2 className="text-2xl font-bold my-3">{children}</h2>
      case 'h3':
        return <h3 className="text-xl font-bold my-2">{children}</h3>
      case 'p':
        return <p className="my-4">{children}</p>
      case 'ul':
        return <ul className="list-disc list-inside my-4">{children}</ul>
      case 'ol':
        return <ol className="list-decimal list-inside my-4">{children}</ol>
      case 'li':
        return <li className="my-1">{children}</li>
      case 'a':
        return (
          <a
            href={node.url}
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        )
      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic">
            {children}
          </blockquote>
        )
      case 'code':
        return (
          <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
            {children}
          </code>
        )
      case 'pre':
        return (
          <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4">
            <code className="text-sm">{children}</code>
          </pre>
        )
      case 'img':
        return <Image width="500" height="500" src={node.url} alt={node.caption ?? ''} className="my-4" />
      case 'hr':
        return (
          <hr className="border-t-2 border-gray-300 dark:border-gray-600 my-4" />
        )
      case 'strong':
        return <strong className="font-bold">{children}</strong>
      default:
        return children
    }
  }

  console.log('Post data:', data.post)

  return (
    <div className="z-10 flex flex-col w-full">
      <div className="flex-1 dark:text-zinc-100 text-zinc-900 font-mono p-4 sm:p-6 md:p-8">
        <ModeToggle />
        <div className="max-w-3xl mx-auto flex flex-col">
          <header className="p-4 text-sm md:text-base text-center mt-8">
            <a
              href="/"
              className="hover:underline transition-all duration-200"
              style={{ textDecorationColor: '#398974' }}
            >
              ← Back to home
            </a>
          </header>
          <header className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-16 md:pt-12">
            <div className="flex-1">
              <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
                {data.post.title}
              </h1>
            </div>
          </header>

          <main className="space-y-8 md:space-y-12 flex-1">
            <article className="prose dark:prose-invert max-w-none">
              {data.post.body && (
                <div
                  className="text-base md:text-lg leading-relaxed"
                  data-tinafeld={tinaField(data.post, 'body')}
                >
                  {renderRichText(data.post.body)}
                </div>
              )}
            </article>
          </main>
        </div>
      </div>
    </div>
  )
}
