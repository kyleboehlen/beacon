import { describe, expect, it } from 'vitest'
import { camelCaseToProperCaseWithSpaces } from './strings.ts'

describe('strings', () => {
  describe('camelCaseToProperCase', () => {
    it('formats msPipelines properly', () => {
      expect(camelCaseToProperCaseWithSpaces(('msPipelines'))).toBe('Ms Pipelines')
    })

    it('formats defenseSatelliteNetworks properly', () => {
      expect(camelCaseToProperCaseWithSpaces(('defenseSatelliteNetworks'))).toBe('Defense Satellite Networks')
    })

    it('formats boardingShips properly', () => {
      expect(camelCaseToProperCaseWithSpaces(('boardingShips'))).toBe('Boarding Ships')
    })
  })
})
