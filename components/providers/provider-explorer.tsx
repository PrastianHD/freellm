import { ProviderCard } from "@/components/providers/provider-card";
import { cn } from "@/lib/utils";
import type { Provider } from "@/types/provider";

export function ProviderExplorer({ providers }: { providers: Provider[] }) {
  if (providers.length === 0) {
    return (
      <div className="rounded-md border-2 border-dashed border-border bg-card p-16 text-center">
        <p className="text-2xl font-black">Belum ada provider.</p>
      </div>
    );
  }
  return <BentoGrid items={providers} />;
}

function BentoGrid({ items }: { items: Provider[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => {
        const featured = i === 0 && items.length > 2;
        return (
          <div
            key={p.slug}
            className={cn(featured && "md:col-span-2 lg:col-span-3")}
          >
            <ProviderCard provider={p} variantIndex={i} featured={featured} />
          </div>
        );
      })}
    </div>
  );
}
