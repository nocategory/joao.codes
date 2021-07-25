import { RichTextBlock } from 'prismic-reactjs'

export interface Data {
  prehey: RichTextBlock[]
  hey: RichTextBlock[]
  intro: RichTextBlock[]
}

export interface Error {
  api_error: boolean
}
