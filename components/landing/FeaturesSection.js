import { FEATURES, STATS } from "@/lib/constants";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-20 border border-border">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 bg-card px-4 py-6 text-center"
            >
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                {value}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Built for smart shoppers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything you need to track prices intelligently — without the clutter.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
