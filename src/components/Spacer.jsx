export default function Spacer({ height = 100 }) {
  const heightMap = {
    100: 'h-[100px]',
    200: 'h-[200px]',
    300: 'h-[300px]',
    400: 'h-[400px]',
  }
  const hClass = heightMap[height] || 'h-[100px]'
  return <div className={`${hClass} w-full`} />
}
