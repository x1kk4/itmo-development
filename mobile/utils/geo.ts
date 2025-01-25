export const prettifyDistance = (distance: number): string => {
  if (distance > 1000) {
    return `${(distance / 1000).toFixed(1)} км от Вас`
  }

  return `${distance} м от Вас`
}
