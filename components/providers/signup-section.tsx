import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_METHOD_LABEL } from "@/lib/labels";
import type { Provider } from "@/types/provider";

export function SignupSection({ provider }: { provider: Provider }) {
  const s = provider.signup;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cara daftar</CardTitle>
          <CardDescription>
            Auth method yang diterima dan syarat tambahan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Auth methods
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {s?.authMethods?.length ? (
                s.authMethods.map((m) => (
                  <Badge key={m} variant="outline">
                    {AUTH_METHOD_LABEL[m]}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">—</span>
              )}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Free email (gmail/outlook)</dt>
            <dd>
              {s?.blocksFreeEmail === true ? (
                <Badge variant="destructive">Diblokir</Badge>
              ) : s?.blocksFreeEmail === false ? (
                <Badge variant="success">Diterima</Badge>
              ) : (
                "—"
              )}
            </dd>

            <dt className="text-muted-foreground">Email organisasi</dt>
            <dd>
              {s?.requiresCorporateEmail ? (
                <Badge variant="warning">Wajib</Badge>
              ) : (
                "Tidak wajib"
              )}
            </dd>

            <dt className="text-muted-foreground">Verifikasi HP</dt>
            <dd>
              {s?.phoneVerification ? (
                <Badge variant="warning">Wajib OTP</Badge>
              ) : (
                "Tidak"
              )}
            </dd>

            {s?.ageRestriction != null && (
              <>
                <dt className="text-muted-foreground">Batas umur</dt>
                <dd>{s.ageRestriction}+</dd>
              </>
            )}
          </dl>

          {s?.notes && (
            <p className="text-xs text-muted-foreground">{s.notes}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Region</CardTitle>
          <CardDescription>Negara yang diblokir untuk sign-up.</CardDescription>
        </CardHeader>
        <CardContent>
          {s?.countryBlocks?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {s.countryBlocks.map((c) => (
                <Badge key={c} variant="destructive">
                  {c}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tidak ada region block yang dilaporkan.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}