import 'prismjs/themes/prism-tomorrow.min.css'

import ReactMarkdown from 'react-markdown'
import rehypePrism from 'rehype-prism-plus'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import { CreateAddTodoData } from '@/contexts/ListTodoContext'

import { markdownComponents } from './styles'

interface MarkdownProps extends CreateAddTodoData {}

const validLanguages = [
  'ts',
  'typescript',
  'tsx',
  'typoscript',
  'tsconfig',
  'javascript',
  'js',
  'jsx',
  'python',
  'py',
  'java',
  'html',
  'css',
  'log',
  'less',
  'sass',
  'scss',
  'cpp',
  'csharp',
  'cs',
  'dotnet',
  'json',
  'rust',
  'ruby',
  'rb',
  'regex',
  'go',
  'lua',
  'git',
  'php',
  'phpdoc',
]

export function Markdown({ task }: MarkdownProps) {
  const languageRegex = /```(\w+)/
  const match = task.match(languageRegex)
  const language = match ? match[1] : null

  const isValidLanguage = validLanguages.includes(language || '')

  const formattedTask = isValidLanguage
    ? task
    : task.replace(languageRegex, '```')

  return (
    <ReactMarkdown
      components={markdownComponents}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, rehypePrism]}
    >
      {formattedTask}
    </ReactMarkdown>
  )
}
