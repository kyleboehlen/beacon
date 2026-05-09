import { registerTailwindClasses } from '@/shared/lib/utils/registerTailwindClasses'

export type PaletteEntry = {
  purchased: string
  staged: string
  purchasable: string
  afterPurchased: string
}

export const techColorPalette: PaletteEntry[] = [
  registerTailwindClasses({
    purchased:      'bg-cyan-500/80 border-cyan-500/60',
    staged:         'bg-cyan-500/55 border-cyan-500/80',
    purchasable:    'border-cyan-500/45 hover:border-cyan-500/70',
    afterPurchased: 'bg-cyan-500/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-blue-500/80 border-blue-500/60',
    staged:         'bg-blue-500/55 border-blue-500/80',
    purchasable:    'border-blue-500/45 hover:border-blue-500/70',
    afterPurchased: 'bg-blue-500/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-emerald-500/80 border-emerald-500/60',
    staged:         'bg-emerald-500/55 border-emerald-500/80',
    purchasable:    'border-emerald-500/45 hover:border-emerald-500/70',
    afterPurchased: 'bg-emerald-500/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-violet-500/80 border-violet-500/60',
    staged:         'bg-violet-500/55 border-violet-500/80',
    purchasable:    'border-violet-500/45 hover:border-violet-500/70',
    afterPurchased: 'bg-violet-500/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-amber-400/80 border-amber-400/60',
    staged:         'bg-amber-400/55 border-amber-400/80',
    purchasable:    'border-amber-400/45 hover:border-amber-400/70',
    afterPurchased: 'bg-amber-400/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-sky-400/80 border-sky-400/60',
    staged:         'bg-sky-400/55 border-sky-400/80',
    purchasable:    'border-sky-400/45 hover:border-sky-400/70',
    afterPurchased: 'bg-sky-400/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-orange-400/80 border-orange-400/60',
    staged:         'bg-orange-400/55 border-orange-400/80',
    purchasable:    'border-orange-400/45 hover:border-orange-400/70',
    afterPurchased: 'bg-orange-400/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-teal-400/80 border-teal-400/60',
    staged:         'bg-teal-400/55 border-teal-400/80',
    purchasable:    'border-teal-400/45 hover:border-teal-400/70',
    afterPurchased: 'bg-teal-400/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-red-500/80 border-red-500/60',
    staged:         'bg-red-500/55 border-red-500/80',
    purchasable:    'border-red-500/45 hover:border-red-500/70',
    afterPurchased: 'bg-red-500/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-indigo-400/80 border-indigo-400/60',
    staged:         'bg-indigo-400/55 border-indigo-400/80',
    purchasable:    'border-indigo-400/45 hover:border-indigo-400/70',
    afterPurchased: 'bg-indigo-400/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-green-500/80 border-green-500/60',
    staged:         'bg-green-500/55 border-green-500/80',
    purchasable:    'border-green-500/45 hover:border-green-500/70',
    afterPurchased: 'bg-green-500/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-slate-400/80 border-slate-400/60',
    staged:         'bg-slate-400/55 border-slate-400/80',
    purchasable:    'border-slate-400/45 hover:border-slate-400/70',
    afterPurchased: 'bg-slate-400/50',
  }),
  registerTailwindClasses({
    purchased:      'bg-yellow-400/80 border-yellow-400/60',
    staged:         'bg-yellow-400/55 border-yellow-400/80',
    purchasable:    'border-yellow-400/45 hover:border-yellow-400/70',
    afterPurchased: 'bg-yellow-400/50',
  }),
]