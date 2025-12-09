"use client";

import { siteConfig } from "@/lib/site-config";
import { FadeIn, GrowY } from "@/components/motion";

export default function RoadmapTimeline() {
  return (
    <div className="relative">
      {/* Main vertical line that stops at the last dot */}
      <GrowY className="absolute left-4 top-4 hidden h-[11rem] w-0.5 bg-gradient-to-b from-brand-primary via-brand-primary/60 to-brand-primary/20 md:left-6 md:h-[15rem] md:block" />

      <div className="space-y-8 md:space-y-12">
        {siteConfig.roadmap.phases.map((phase, index) => {
          const isLast = index === siteConfig.roadmap.phases.length - 1;
          return (
            <FadeIn key={phase.title} delay={0.1 * index} className="relative">
              <div className="flex items-start gap-6">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-brand-primary shadow-md ring-4 ring-brand-primary/10 md:h-10 md:w-10">
                    <div className="h-2 w-2 rounded-full bg-white md:h-3 md:w-3" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-2 pb-8 md:gap-3">
                  {/* Status and period badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
                      {phase.period}
                    </span>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      phase.status === 'Berjalan'
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : phase.status === 'Progres'
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : phase.status === 'Terjadwal'
                        ? 'border-orange-200 bg-orange-50 text-orange-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-slate-600 md:text-lg leading-relaxed">
                    {phase.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
