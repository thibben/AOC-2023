import { file } from 'bun'
import { exit } from 'process'

type Race = {time: number, len: number}

const input = {
  s: await file('input.txt').text(),
  get races(): Race[] {
    const times = this.s.split('\n')[0].match(/\d+/g)?.map(Number)
    const lengths = this.s.split('\n')[1].match(/\d+/g)?.map(Number)
    return times?.map((t,i) => { return {time: times[i], len: lengths?.at(i) ?? 0}}) ?? []
  },
  get race2(): Race {
    return {
      time: Number(this.s.split('\n')[0].match(/\d+/g)?.join("")),
      len: Number(this.s.split('\n')[1].match(/\d+/g)?.join("")),
    }
  }
}

const mul = (a: number, b: number) => a * b

const findWinners = (time: number, len: number) => {
  let aboveLen = 0
  for(let i = 1; i < time; i++){
    if( i * (time - i) > len) aboveLen +=1
  }
  return aboveLen
}

export const day01 = {
  part1: () => {
    return input.races.map(({time, len}) => findWinners(time, len)).reduce(mul)
  },
  part2: () => {return findWinners(input.race2.time, input.race2.len)},
}

process.env.part === 'part1' && console.log(day01.part1())
process.env.part === 'part2' && console.log(day01.part2())
