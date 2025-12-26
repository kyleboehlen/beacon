import { vi } from 'vitest'

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock)

// Mock ApexCharts to prevent SVG rendering errors in jsdom
vi.mock('apexcharts', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      render: vi.fn().mockResolvedValue(undefined),
      destroy: vi.fn(),
      updateOptions: vi.fn(),
      updateSeries: vi.fn(),
      appendData: vi.fn(),
      toggleSeries: vi.fn(),
      showSeries: vi.fn(),
      hideSeries: vi.fn(),
      resetSeries: vi.fn(),
      zoomX: vi.fn(),
      toggleDataPointSelection: vi.fn(),
      appendSeries: vi.fn(),
      addText: vi.fn(),
      addXaxisAnnotation: vi.fn(),
      addYaxisAnnotation: vi.fn(),
      addPointAnnotation: vi.fn(),
      clearAnnotations: vi.fn(),
      dataURI: vi.fn(),
    })),
  }
})
