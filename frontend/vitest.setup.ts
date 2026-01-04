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

// Mock fetch to prevent actual API calls in tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ success: true, payload: {} }),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    formData: () => Promise.resolve(new FormData()),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'basic',
    url: '',
    clone: vi.fn(),
    body: null,
    bodyUsed: false,
  } as Response),
)
