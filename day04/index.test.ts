import { describe, expect, test } from 'bun:test'
import { day01 } from './index.ts'

describe('Bun Tests Examples', () => {
  test('Part 1', () => {
    expect(day01.part1()).toBe(18653)
  })
  test('Part 2', () => {
    expect(day01.part2()).toBe(5921508)
  })
})
