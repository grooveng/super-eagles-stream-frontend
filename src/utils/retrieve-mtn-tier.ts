export function retrieveMTNTier(tierToken?: number) {
  if (tierToken === 1) return process.env.NEXT_PUBLIC_MTN_TIER_1;
  if (tierToken === 2) return process.env.NEXT_PUBLIC_MTN_TIER_2;
  if (tierToken === 3) return process.env.NEXT_PUBLIC_MTN_TIER_3;

  return undefined;
}
