export default function useClickOutside(handler: () => void, id: string) {
  const middleware = ({ target }: Event) => {
    return (target as Element).id !== id
  }

  return {
    handler,
    middleware
  }
}
