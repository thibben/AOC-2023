import { file } from 'bun'

interface Card {numbers: number[], winners: number[], copies:number }

const getNumbers = (s: string) => { return s.match(/\d{1,2}/gm)?.map(n => +n) ?? []}

const input = {
  s: await file('input.txt').text(),
  get parseCards(): Card[] {
    return this.s.split('\n').map((line) => {
      const res = line.split(':').at(1)?.split('|')
      return { winners: getNumbers( res?.at(0) ?? ""), numbers: getNumbers( res?.at(1) ?? "" ), copies: 1}

    })
  },
}

const add = (a: number, b: number) => a + b

export const day01 = {
  part1: () => { 
    return input.parseCards
    .map(( {winners, numbers} ) => {
      return numbers.filter(n => winners.includes(n))
    })
    .map( x => x.length)
    .map(n => n == 0 ? 0 : 2**(n-1))
    .reduce(add)
  },
  part2: () => {
    const cards = input.parseCards
    const maxN = cards.length - 1
    cards.forEach(( {winners, numbers, copies}, cI) => {
      const numwinners = numbers.filter(n => winners.includes(n)).length
      for(let i =1; i <= numwinners; i++) {
        if(cI + i <= maxN )cards[cI + i].copies += copies
      }
    })
    return cards.reduce((c1, {copies:c2}) => add(c1,c2), 0)
  },
}

process.env.part === 'part1' && console.log(day01.part1())
process.env.part === 'part2' && console.log(day01.part2())
