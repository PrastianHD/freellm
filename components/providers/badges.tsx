import { Badge } from "@/components/ui/badge";
import type { AccessType, Modality } from "@/types/provider";
import { ACCESS_TYPE_LABEL, MODALITY_LABEL } from "@/lib/labels";

const ACCESS_VARIANT: Record<
  AccessType,
  "success" | "info" | "warning" | "secondary" | "outline"
> = {
  "fully-free": "success",
  "free-credits": "info",
  freemium: "warning",
  "free-tier": "info",
  "open-source-self-hosted": "secondary",
};

export function AccessBadge({ type }: { type: AccessType }) {
  return <Badge variant={ACCESS_VARIANT[type]}>{ACCESS_TYPE_LABEL[type]}</Badge>;
}

export function ModalityBadge({ modality }: { modality: Modality }) {
  return (
    <Badge variant="outline" className="font-normal">
      {MODALITY_LABEL[modality]}
    </Badge>
  );
}
