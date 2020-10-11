import candicates from '@/lib/Candicates.ts'

export function choice () {
  return candicates[Math.floor(Math.random() * candicates.length)]
}
