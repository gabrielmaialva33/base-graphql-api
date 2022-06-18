const colors = {
  info: '36',
  error: '31;1',
  warn: '33',
  debug: '90',
}

type LogLevel = keyof typeof colors

export const LOG = (level: LogLevel, msg: string) => {
  msg = color(formatDate(new Date()), '30;1') + ' ' + msg
  const c = colors[level.toLowerCase() as LogLevel] || '32'
  console.log('[' + color(level.toUpperCase(), c) + '] ' + msg)
}

const color = (s: string, c: string) => {
  if (process.stdout.isTTY) return '\x1B[' + c + 'm' + s + '\x1B[0m'
  return s
}

const formatDate = (date: Date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((n) => n.toString().padStart(2, '0'))
    .join(':')
