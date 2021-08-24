import { RichTextBlock } from 'prismic-reactjs'

export type Data = {
  prehey: RichTextBlock[]
  hey: RichTextBlock[]
  intro: RichTextBlock[]
}

export type Error = {
  api_error: boolean
}

export type SocialIcon = {
  url: string
  label: string
  width?: number
  height?: number
}
