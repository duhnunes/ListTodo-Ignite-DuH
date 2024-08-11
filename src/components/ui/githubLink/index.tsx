import { Github } from 'lucide-react'

export function GithubLink() {
  return (
    <div className="size-[150px] bg-gray-200 text-gray-700 rotate-45 right-0 translate-x-[50%] -translate-y-[50%] flex items-end justify-center fixed">
      <a
        href="https://github.com/duhnunes"
        title="Acessar: https://github.com/duhnunes"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="size-10 hover:fill-gray-700" />
      </a>
    </div>
  )
}
