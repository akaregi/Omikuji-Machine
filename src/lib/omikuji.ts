import { funny, tradition } from './candidate'

export function lottery(traditional?: boolean) {
  if (traditional) {
    return draw(tradition)
  }

  return draw(funny.concat(tradition))
}

function draw(candicates: string[]): string {
  return candicates[Math.floor(Math.random() * candicates.length)]
}