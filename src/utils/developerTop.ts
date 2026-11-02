import type { Show } from '../types/show'

export const developerTopIds = [150, 169, 82, 269, 541, 40, 29, 123, 76, 4]

export interface RankedShow {
  rank: number
  show: Show
}

export function getDeveloperTop(shows: Show[]): RankedShow[] {
  return developerTopIds.flatMap((id, index) => {
    const show = shows.find(item => item.id === id)
    return show ? [{ rank: index + 1, show }] : []
  })
}
