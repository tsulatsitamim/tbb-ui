export const initial = name => {
  const names = name.split(' ').filter(x => !x.includes('.') && x.length > 2)

  return (
    (names[0] || name.split(' ')[0]).substr(0, 1) +
    (names[1] || name.split(' ')[0] || '').substr(0, 1)
  )
}
