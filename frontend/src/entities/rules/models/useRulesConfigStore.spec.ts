import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRulesConfigStore } from './useRulesConfigStore'
import { RulesConfigStatus, RuleCategory } from './types'
import type { RulesConfig, RuleOption } from './types'

const makeRule = (value: boolean): RuleOption<boolean> => ({
  value,
  description: '',
  category: RuleCategory.Basic,
  enabled: true,
  referenceNumber: '',
  rulePage: 0,
})

const mockApi = {
  hydrateRulesConfig: vi.fn(),
  createRulesConfig: vi.fn(),
  getRulesConfig: vi.fn(),
  updateRulesConfig: vi.fn(),
  deleteRulesConfig: vi.fn(),
}

vi.mock('@/entities/rules/api/useRulesApi', () => ({
  useRulesApi: () => mockApi,
}))

const makeConfig = (overrides: Partial<RulesConfig> = {}): RulesConfig =>
  ({
    id: 'abc123',
    status: RulesConfigStatus.Draft,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }) as RulesConfig

describe('useRulesConfigStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('isLocked', () => {
    it('is true only when status is Active', () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ status: RulesConfigStatus.Active }))
      expect(store.isLocked).toBe(true)
    })

    it('is false for Draft, Template, and Archived', () => {
      const store = useRulesConfigStore()
      for (const status of [RulesConfigStatus.Draft, RulesConfigStatus.Template, RulesConfigStatus.Archived]) {
        store.setRulesConfig(makeConfig({ status }))
        expect(store.isLocked).toBe(false)
      }
    })
  })

  describe('setStatus', () => {
    it('throws when no config is loaded', () => {
      const store = useRulesConfigStore()
      expect(() => store.setStatus(RulesConfigStatus.Active)).toThrow()
    })

    it('updates status and isLocked reacts', () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ status: RulesConfigStatus.Draft }))

      store.setStatus(RulesConfigStatus.Active)
      expect(store.isLocked).toBe(true)

      store.setStatus(RulesConfigStatus.Archived)
      expect(store.isLocked).toBe(false)
    })
  })

  describe('clearRulesConfig', () => {
    it('resets state and all getters', () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig())

      store.clearRulesConfig()

      expect(store.rulesConfig).toBeNull()
      expect(store.hasRulesConfig).toBe(false)
      expect(store.rulesConfigId).toBeNull()
    })
  })

  describe('hydrateDefaults', () => {
    it('throws when API returns false', async () => {
      mockApi.hydrateRulesConfig.mockResolvedValue(false)
      const store = useRulesConfigStore()
      await expect(store.hydrateDefaults()).rejects.toThrow()
    })

    it('sets rulesConfig from response without persisting an ID', async () => {
      mockApi.hydrateRulesConfig.mockResolvedValue({
        defaultRulesConfig: makeConfig({ id: 'ignored' }),
      })
      const store = useRulesConfigStore()
      await store.hydrateDefaults()
      expect(store.hasRulesConfig).toBe(true)
      expect(store.rulesConfigId).toBe('')
    })
  })

  describe('saveRulesConfig', () => {
    it('throws when no config is loaded', async () => {
      const store = useRulesConfigStore()
      await expect(store.saveRulesConfig()).rejects.toThrow()
    })

    it('returns the ID from the response', async () => {
      const saved = makeConfig({ id: 'new-id' })
      mockApi.createRulesConfig.mockResolvedValue({ rulesConfig: saved })
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ id: '' }))

      const id = await store.saveRulesConfig()
      expect(id).toBe('new-id')
      expect(store.rulesConfigId).toBe('new-id')
    })
  })

  describe('updateRulesConfig', () => {
    it('throws when no config with ID is loaded', async () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ id: '' }))
      await expect(store.updateRulesConfig()).rejects.toThrow()
    })
  })

  describe('rulesForCategory', () => {
    it('returns only rules matching the given category', () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({
        msPipelines: makeRule(false),
        shipGroupLimits: { ...makeRule(true), category: RuleCategory.Beacon },
      }))

      const basic = store.rulesForCategory(RuleCategory.Basic)
      const beacon = store.rulesForCategory(RuleCategory.Beacon)

      expect(basic.value.every(r => r.category === RuleCategory.Basic)).toBe(true)
      expect(beacon.value.every(r => r.category === RuleCategory.Beacon)).toBe(true)
    })

    it('returns empty array when no config is loaded', () => {
      const store = useRulesConfigStore()
      expect(store.rulesForCategory(RuleCategory.Basic).value).toEqual([])
    })

    it('returns rules with their store key attached', () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ msPipelines: makeRule(true) }))

      const rules = store.rulesForCategory(RuleCategory.Basic)
      expect(rules.value[0].key).toBe('msPipelines')
    })
  })

  describe('toggleRuleValue', () => {
    it('throws when no config is loaded', () => {
      const store = useRulesConfigStore()
      expect(() => store.toggleRuleValue('msPipelines')).toThrow()
    })

    it('throws when config is locked', () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ status: RulesConfigStatus.Active }))
      expect(() => store.toggleRuleValue('msPipelines')).toThrow()
    })

    it('toggles a rule value', () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ msPipelines: makeRule(false) }))

      store.toggleRuleValue('msPipelines')
      expect(store.rulesConfig?.msPipelines.value).toBe(true)
    })
  })

  describe('deleteRulesConfig', () => {
    it('throws when no config with ID is loaded', async () => {
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ id: '' }))
      await expect(store.deleteRulesConfig()).rejects.toThrow()
    })

    it('clears config on success', async () => {
      mockApi.deleteRulesConfig.mockResolvedValue({})
      const store = useRulesConfigStore()
      store.setRulesConfig(makeConfig({ id: 'abc123' }))

      await store.deleteRulesConfig()
      expect(store.rulesConfig).toBeNull()
    })
  })
})