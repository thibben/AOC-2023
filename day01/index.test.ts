import { describe, expect, test } from 'bun:test'
import { day01, replaceWithNumber } from './index.ts'

describe('Bun Tests Examples', () => {
  test('Part 1', () => {
    expect(day01.part1()).toBe(54877)
  })
  test('Part 2', () => {
    expect(day01.part2()).toBe(54100)
  })
})
