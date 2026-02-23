export function EventsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading events">
      <div className="wrap">
        <div className="flex items-center gap-4 mb-16">
          <div className="skeleton w-6 h-3" />
          <div className="skeleton flex-1 h-px" />
          <div className="skeleton w-24 h-8" />
        </div>
        <div className="grid grid-cols-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-5 grid grid-cols-[52px_1fr_80px] gap-6 items-center border-b border-[var(--rule)]"
            >
              <div className="skeleton w-[52px] h-[60px]" />
              <div className="flex flex-col gap-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
              </div>
              <div className="skeleton h-7 w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NewsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading news">
      <div className="wrap">
        <div className="flex items-center gap-4 mb-16">
          <div className="skeleton w-6 h-3" />
          <div className="skeleton flex-1 h-px" />
          <div className="skeleton w-16 h-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-7 flex flex-col gap-4 border border-[var(--rule)]">
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24" />
                <div className="skeleton h-3 w-12" />
              </div>
              <div className="skeleton h-6 w-5/6" />
              <div className="flex flex-col gap-2">
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-4/5" />
                <div className="skeleton h-3 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function OfficersSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading officers">
      <div className="wrap">
        <div className="flex items-center gap-4 mb-16">
          <div className="skeleton w-6 h-3" />
          <div className="skeleton flex-1 h-px" />
          <div className="skeleton w-24 h-8" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 flex flex-col gap-3 border border-[var(--rule)]">
              <div className="skeleton w-full aspect-[4/5]" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
