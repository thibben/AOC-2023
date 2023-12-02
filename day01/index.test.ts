import { describe, expect, test } from 'bun:test'
import { day01, replaceWithNumber } from './index.ts'

describe('Bun Tests Examples', () => {
  test('Part 1', () => {
    expect(day01.part1()).toBe(54877)
  })
  test.skip('Part 2', () => {
    expect(day01.part2()).toBe(56154)
  })
  test('test replace', () => {
    expect(replaceWithNumber('onetwothreefourfivesixseveneightnine')).toBe("123456789")
  })
  test('test replace', () => {
    expect(replaceWithNumber('nvvxfxbgldrb2seven7twokxzbfkvptflnhlqjrthreeoneights')).toBe("nvvxfxbgldrb2772kxzbfkvptflnhlqjr318s")
  })
})
