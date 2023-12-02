import { file } from 'bun'

const input = {
  s: await file('input.txt').text(),
  get parse() {
    return this.s.split('\n')
  },
}

const add = (a: number, b: number) => a + b
const isNotValid = (values: string[], limit: number) => values.some(s => +s > limit) 
const getMax = (values: string[]) => Math.max(...values.map(v => +v))

const regexBlue = /\d{1,2}(?=\sblue)/gm
const regexGreen = /\d{1,2}(?=\sgreen)/gm
const regexRed = /\d{1,2}(?=\sred)/gm

export const day01 = {
  part1: () => {
    return input.parse
      .map((line, i) => {
        const blues = line.match(regexBlue) ?? []
        const greens = line.match(regexGreen) ?? []
        const reds = line.match(regexRed) ?? []
        if( isNotValid( blues, 14 ) || isNotValid( greens, 13 ) || isNotValid( reds, 12 )) return 0
        return i + 1

      })
      .reduce(add)
  }
    ,
  part2: () => {
    return input.parse
      .map((line, i) => {
        const blues = line.match(regexBlue) ?? []
        const greens = line.match(regexGreen) ?? []
        const reds = line.match(regexRed) ?? []
        return getMax(blues) * getMax(reds) * getMax(greens)

      })
      .reduce(add)
  },
}

process.env.part === 'part1' && console.log(day01.part1())
process.env.part === 'part2' && console.log(day01.part2())
