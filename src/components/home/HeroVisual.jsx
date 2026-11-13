import { motion, useScroll, useTransform } from 'framer-motion';
import { FileCheck2, Send, SearchCheck, CircleDollarSign, Stethoscope, Building2, HeartPulse, RotateCcw } from 'lucide-react';
import LogoMark from '../ui/LogoMark.jsx';
import { ease } from '../ui/Reveal.jsx';

const steps = [
  { icon: FileCheck2, label: 'Claim prepared', note: 'Codes & details reviewed' },
  { icon: Send, label: 'Submitted to payer', note: 'Tracked from day one' },
  { icon: SearchCheck, label: 'Adjudication', note: 'Status followed up' },
  { icon: CircleDollarSign, label: 'Payment posted', note: 'Reconciled & reported' },
  { icon: RotateCcw, label: 'Denial reviewed', note: 'Corrected & resubmitted' },
];

/** Illustrative "claim journey" composition. Purely visual: no figures or stats. */
export default function HeroVisual() {
  const { scrollY } = useScroll();
  const yBack = useTransform(scrollY, [0, 600], [0, -10]);
  const yFront = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <div className="relative mx-auto w-full max-w-[34rem] pb-12 pt-12 sm:px-6" aria-hidden>
      {/* glow */}
      <div className="absolute inset-[12%] rounded-full bg-royal-500/30 blur-[90px]" />

      {/* main card */}
      <motion.div
        style={{ y: yBack }}
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.5 }}
        className="relative rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)] backdrop-blur-xl sm:inset-x-[8%] sm:p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white"><LogoMark className="h-6 w-auto" /></span>
            <div>
              <p className="font-display text-sm font-semibold text-white">Claim journey</p>
              <p className="text-xs text-mist-400">Managed end to end</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> In progress
          </span>
        </div>

        <ol className="relative mt-6 space-y-3">
          <div className="absolute bottom-6 left-[19px] top-6 w-px bg-white/10" />
          <motion.div className="absolute left-[19px] top-6 w-px origin-top bg-gradient-to-b from-royal-300 to-royal-500" initial={{ height: 0 }} animate={{ height: 'calc(100% - 3rem)' }} transition={{ duration: 2.2, delay: 1.2, ease: 'easeInOut' }} />
          {steps.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 1.1 + i * 0.5 }}
              className="relative flex items-center gap-4 rounded-2xl bg-white/[0.06] px-3 py-3 ring-1 ring-white/10"
            >
              <motion.span
                className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                initial={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                animate={{ backgroundColor: '#0A66D6' }}
                transition={{ delay: 1.4 + i * 0.5, duration: 0.4 }}
              >
                <s.icon className="h-[18px] w-[18px]" />
              </motion.span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{s.label}</p>
                <p className="truncate text-xs text-mist-400">{s.note}</p>
              </div>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 + i * 0.5, type: 'spring', stiffness: 400, damping: 18 }} className="ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[10px] font-bold text-navy-950">✓</motion.span>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {/* floating chip */}
      <motion.div style={{ y: yFront }} className="absolute -right-1 -top-3 z-10 sm:-right-2">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.8, ease }} className="animate-float rounded-2xl bg-navy-900/90 p-3 shadow-lift ring-1 ring-white/10 backdrop-blur [animation-delay:-3s]">
          <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-400">Built for</p>
          <div className="flex gap-2">
            {[Stethoscope, Building2, HeartPulse].map((I, i) => (
              <span key={i} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-royal-200"><I className="h-4 w-4" /></span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
