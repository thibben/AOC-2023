import { file } from 'bun'

const input = {
  s: await file('input.txt').text(),
  get parseLine() {
    return this.s.split('\n').map((x) => x)
  },
}

const nums: Record<string,string> = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "4",
  five: "5e",
  six: "6",
  seven: "7n" ,
  eight: "e8t",
  nine: "n9e", 
}

export const replaceWithNumber = (line: string) => line.replace(/one|two|three|four|five|six|seven|eight|nine/gm, (x) => nums[x])

const add = (a: number, b: number) => a + b

export const day01 = {
  part1: () => {
    return input.parseLine
      .map((x) => x.match(/\d/gm) ?? [])
      .map((numbers) => Number([numbers.at(0), numbers.at(-1)].join('')))
      .reduce(add)
  },
  part2: () => {
    return input.parseLine
      .map(replaceWithNumber) // jag vet, men WHY göra en första uppgift så omständig
      .map((x) => replaceWithNumber(x).match(/\d/gm) ?? [])
      .map((numbers) => Number([numbers.at(0), numbers.at(-1)].join('')))
      .reduce(add)
  }
}

process.env.part === 'part1' && console.log(day01.part1())
process.env.part === 'part2' && console.log(day01.part2())
