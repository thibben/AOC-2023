import { file } from 'bun'
import { InferencePriority } from 'typescript'

type Mapping = { dest: number, src: number, range: number}
type Pair = { start: number, range: number}

const input = {
  s: await file('input.txt').text(),
  get parts() {
    return this.s.split('\n\n')
  },
  get seeds() {
    return this.parts[0].match(/\d+/g)?.map(Number) ?? []
  },
  get maps(): Mapping[][] {
    return this.parts.slice(1).map((part) => {
      return part
        .split("\n")
        .slice(1)
        .map(line => line.match(/\d+/g)?.map(Number) ?? [])
        .map(([dest, src, range]) => ({dest, src, range}))
    })
  },
  get seeds_part2(): Pair[] {
    const s = this.seeds
    const pairs: Pair[] = []
    for(let i = 0; i < (s.length - 1); i += 2 ){
      pairs.push({start: s[i], range: s[i+1]})
    }
    return pairs
  },
  get largestLocationValue() {
    return Math.max(...this.maps.at(-1)?.map(({ dest }) => dest ?? 0) ?? [])
  }
}

const findDestinationValue = (valueToConvert: number, maps: Mapping[]) => {
  const { dest, src, range} = maps.find((map) => (valueToConvert >= map.src && valueToConvert <= (map.src + map.range))) ?? {}
  if(dest == null || src == null || range == null) return valueToConvert
  return (dest + (valueToConvert - src))
}

const findSourceValue = (valueToConvert: number, maps: Mapping[]) => {
  const { dest, src, range} = maps.find((map) => (valueToConvert >= map.dest && valueToConvert <= (map.dest + map.range))) ?? {}
  if(dest == null || src == null || range == null) return valueToConvert
  return (valueToConvert + (src - dest))
}

const checkIfSeed = (seed: number, seedRanges: Pair[]):boolean => {
  return seedRanges.some(({ start, range}) => (seed >= start && seed < (start + range)) )
}


// 60 56 37
// humidity to location humidity 82 -> 60(dest) + (seed - src) = 60 + 82 - 56 = 60 + 26  = 86
// location to humidity 86 -> src + (seed - dest) = 56 + (86 - 60) = 56 + 26 = 82
// location to humidity 86 -> seed + (src - dest) = 86 + (56 - 60) = 56 + 26 = 82

export const day01 = {
  part1: () => {
    const lastValues = input.seeds.map(s => input.maps.reduce(findDestinationValue,s))
    return Math.min(...lastValues)
  },
  part2: () => { // 136096660
    const seedPairs = input.seeds_part2
    const largest = input.largestLocationValue
    const maps = input.maps.reverse()
    for(let i = 0; i < largest; i+=1){
      const seed = maps.reduce(findSourceValue, i)
      if(checkIfSeed(seed, seedPairs)) return i
    }
    return 0
  },
}

process.env.part === 'part1' && console.log(day01.part1())
process.env.part === 'part2' && console.log(day01.part2())
