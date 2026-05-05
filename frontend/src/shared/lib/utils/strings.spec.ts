import { describe, expect, it } from 'vitest'
import { camelCaseToProperCase } from './strings.ts'

describe('strings', () => {
  describe('camelCaseToProperCase', () => {
    it('formats msPipelines properly', () => {
      expect(camelCaseToProperCase(('msPipelines'))).toBe('Ms Pipelines')
    })

    it('formats defenseSatelliteNetworks properly', () => {
      expect(camelCaseToProperCase(('defenseSatelliteNetworks'))).toBe('Defense Satellite Networks')
    })

    it('formats boardingShips properly', () => {
      expect(camelCaseToProperCase(('boardingShips'))).toBe('Boarding Ships')
    })
  })
})
