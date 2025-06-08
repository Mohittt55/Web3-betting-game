import { Card, CardContent } from "@/components/ui/card";

export default function SubscriptionPage() {
  return (
    <main className="p-4">
      <h2 className="text-2xl font-serif mb-4">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Basic", "Pro", "Elite"].map((plan) => (
          <Card key={plan}>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{plan} Plan</h3>
              <p className="text-muted-foreground">Details about the {plan.toLowerCase()} plan.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
