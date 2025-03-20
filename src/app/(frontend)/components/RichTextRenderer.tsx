interface TextNode {
  text: string
  type: string
  format?: number
  style?: string
  detail?: number
  mode?: string
}

interface BlockNode {
  type: string
  children?: (TextNode | BlockNode)[]
  format?: string
  indent?: number
  version?: number
  direction?: string
  textStyle?: string
  textFormat?: number
  tag?: string
  listType?: string
  start?: number
  value?: number
}

interface RichTextContent {
  root: {
    children: BlockNode[]
  }
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export default function RichTextRenderer({ content }: { content: RichTextContent }) {
  if (!content?.root?.children) return null

  const renderTextNode = (node: TextNode, index: number) => {
    if (!node) return null
    if (node.type === 'linebreak') {
      return <br key={`br-${index}`} />
    }
    return <span key={`text-${index}`}>{node.text}</span>
  }

  const renderBlock = (block: BlockNode, index: number) => {
    if (!block) return null

    const children =
      block.children
        ?.map((child, childIndex) => {
          if (!child) return null
          if ('text' in child) {
            return renderTextNode(child as TextNode, childIndex)
          }
          // For nested blocks, we'll render their children directly
          if ('children' in child) {
            return (child as BlockNode).children
              ?.map((nestedChild, nestedIndex) => {
                if (!nestedChild) return null
                if ('text' in nestedChild) {
                  return renderTextNode(nestedChild as TextNode, nestedIndex)
                }
                return null
              })
              .filter(Boolean)
          }
          return null
        })
        .filter(Boolean) || []

    switch (block.type) {
      case 'paragraph':
        return (
          <p key={`p-${index}`} className="mb-4">
            {children}
          </p>
        )
      case 'heading':
        const headingTag = (block.tag as HeadingTag) || 'h2'
        const HeadingComponent = headingTag
        return (
          <HeadingComponent key={`h-${index}`} className="text-2xl font-bold mb-4">
            {children}
          </HeadingComponent>
        )
      case 'quote':
        return (
          <blockquote
            key={`quote-${index}`}
            className="border-l-4 border-primary-accent pl-4 italic mb-4"
          >
            {children}
          </blockquote>
        )
      case 'list':
        const ListComponent = block.tag === 'ul' ? 'ul' : 'ol'
        return (
          <ListComponent key={`list-${index}`} className="list-disc pl-6 mb-4">
            {block.children?.map((item, itemIndex) => {
              if (item.type === 'listitem' && 'children' in item) {
                return (
                  <li key={`li-${itemIndex}`}>
                    {(item as BlockNode).children
                      ?.map((child: TextNode | BlockNode, childIndex: number) => {
                        if (!child) return null
                        if ('text' in child) {
                          return renderTextNode(child as TextNode, childIndex)
                        }
                        return null
                      })
                      .filter(Boolean)}
                  </li>
                )
              }
              return null
            })}
          </ListComponent>
        )
      case 'listitem':
        return <li key={`li-${index}`}>{children}</li>
      default:
        return <div key={`div-${index}`}>{children}</div>
    }
  }

  return (
    <div className="prose prose-invert max-w-none">
      {content.root.children.map((block, index) => renderBlock(block, index))}
    </div>
  )
}
