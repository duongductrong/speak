import { createFileRoute } from '@tanstack/react-router'
import { Button, Spin } from 'antd'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <Spin size="small" />
      <Button type="primary">Hello world</Button>
    </div>
  )
}
