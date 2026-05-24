import { STEPS } from "@/lib/constants";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            How it works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Get started in under two minutes. No configuration, no extensions — just paste and track.
          </p>
        </div>

        {/* Steps grid */}
        <ol className="grid sm:grid-cols-2 gap-4">
          {STEPS.map(({ step, title, body, icon: Icon }) => (
            <li
              key={step}
              className="relative flex gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              {/* Step number */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                {step}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden />
                  <h3 className="font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>

              {/* Connector line for first two steps on desktop */}
              {step < 3 && (
                <div
                  className="absolute -right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background z-10 text-xs text-muted-foreground font-medium"
                  aria-hidden
                >
                  →
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* Helper note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Price checks run automatically every day — you never have to do anything after the initial setup.
        </p>
      </div>
    </section>
  );
}
