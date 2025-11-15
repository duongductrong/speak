import { createFileRoute } from '@tanstack/react-router'
import { Spin } from 'antd'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <Spin size="small" />
    </div>
  )
}
