import React from 'react'
import ImageCarousel from '~/components/custom/imageCarousel'
import Article from '~/components/custom/article'

type CarouselItem = {
  id: number
  imageUrl: string
  caption: string
}

type CarouselContent = {
  type: 'carousel'
  items: CarouselItem[]
}

type ArticleContent = {
  type: 'article'
  title: string
  content: string
}

type Content = CarouselContent | ArticleContent

export default function ContentDisplay({ content }: { content: Content }) {
  if (content.type === 'carousel') {
    return <ImageCarousel items={content.items} />
  } else {
    return <Article title={content.title} content={content.content} />
  }
}