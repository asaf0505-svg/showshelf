interface StatusMessageProps {
  message: string
}

export default function StatusMessage({ message }: StatusMessageProps) {
  return <p className="status-message" role="status">{message}</p>
}
