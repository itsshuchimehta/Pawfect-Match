import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md relative mb-6"
      role="alert"
    >
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  )
}

