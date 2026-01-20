import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useToast } from './useToast'

describe('useToast', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('adds toasts with unique IDs', () => {
    const store = useToast()

    store.add({ message: 'Toast 1' })
    store.add({ message: 'Toast 2' })

    expect(store.toasts[0].id).not.toBe(store.toasts[1].id)
    expect(store.toasts.length).toBe(2)
  })

  it('removes toasts by ID', () => {
    const store = useToast()

    store.add({ message: 'Test', duration: 0 })
    expect(store.toasts.length).toBe(1)

    const id = store.toasts[0].id as string
    store.remove(id)
    expect(store.toasts.length).toBe(0)
  })

  it('clears all toasts', () => {
    const store = useToast()

    store.add({ message: 'Toast 1', duration: 0 })
    store.add({ message: 'Toast 2', duration: 0 })
    store.add({ message: 'Toast 3', duration: 0 })

    expect(store.toasts.length).toBe(3)

    store.clear()
    expect(store.toasts.length).toBe(0)
  })

  it('success method sets correct type', () => {
    const store = useToast()

    store.success('Success message')

    expect(store.toasts[0].type).toBe('success')
    expect(store.toasts[0].message).toBe('Success message')
  })

  it('error method sets correct type', () => {
    const store = useToast()

    store.error('Error message')

    expect(store.toasts[0].type).toBe('error')
    expect(store.toasts[0].message).toBe('Error message')
  })

  it('warning method sets correct type', () => {
    const store = useToast()

    store.warning('Warning message')

    expect(store.toasts[0].type).toBe('warning')
    expect(store.toasts[0].message).toBe('Warning message')
  })

  it('info method sets correct type', () => {
    const store = useToast()

    store.info('Info message')

    expect(store.toasts[0].type).toBe('info')
    expect(store.toasts[0].message).toBe('Info message')
  })

  it('default duration is 5000ms', () => {
    const store = useToast()

    store.add({ message: 'Test' })

    expect(store.toasts[0].duration).toBe(5000)
  })

  it('auto-dismisses after duration', () => {
    const store = useToast()

    store.add({ message: 'Test', duration: 3000 })

    expect(store.toasts.length).toBe(1)

    vi.advanceTimersByTime(3000)

    expect(store.toasts.length).toBe(0)
  })

  it('does not auto-dismiss when duration is 0', () => {
    const store = useToast()

    store.add({ message: 'Test', duration: 0 })

    expect(store.toasts.length).toBe(1)

    vi.advanceTimersByTime(10000)

    expect(store.toasts.length).toBe(1)
  })

  it('accepts custom duration', () => {
    const store = useToast()

    store.add({ message: 'Test', duration: 10000 })

    expect(store.toasts[0].duration).toBe(10000)
  })

  it('accepts custom dismissible', () => {
    const store = useToast()

    store.add({ message: 'Test', dismissible: false })

    expect(store.toasts[0].dismissible).toBe(false)
  })

  it('does not remove non-existent toast', () => {
    const store = useToast()

    store.add({ message: 'Test', duration: 0 })
    store.remove('non-existent-id')

    expect(store.toasts.length).toBe(1)
  })

  it('stores custom component and props', () => {
    const store = useToast()
    const CustomComponent = { template: '<div>Custom</div>' }

    store.add({
      message: 'Test',
      component: CustomComponent,
      props: { foo: 'bar' },
    })

    expect(store.toasts[0].component).toStrictEqual(CustomComponent)
    expect(store.toasts[0].props).toEqual({ foo: 'bar' })
  })

  it('uses provided ID if given', () => {
    const store = useToast()

    store.add({ id: 'custom-id', message: 'Test' })

    expect(store.toasts[0].id).toBe('custom-id')
  })

  it('preserves type when passed to add', () => {
    const store = useToast()

    store.add({ message: 'Test', type: 'error' })

    expect(store.toasts[0].type).toBe('error')
  })
})