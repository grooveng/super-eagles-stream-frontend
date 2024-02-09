import { loadStripe } from "@stripe/stripe-js";

export async function checkoutStripe({
  lineItems,
  userId,
  orderId,
}: {
  lineItems: Array<{
    price?: string;
    quantity?: number;
  }>;
  userId: string | number;
  orderId: number | undefined;
}) {
  let stripePromise: any;
  const p_key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(p_key);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.href}/payments?status=success&uid=${userId}&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.href}/payments?status=failed`,
    metadata: {
      orderId,
    },
  });
}
