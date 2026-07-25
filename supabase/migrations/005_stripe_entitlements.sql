-- Stripe subscription fields on user_entitlements (web card payments)

alter table public.user_entitlements add column if not exists stripe_customer_id text;
alter table public.user_entitlements add column if not exists stripe_subscription_id text;
alter table public.user_entitlements add column if not exists stripe_price_id text;
alter table public.user_entitlements add column if not exists stripe_current_period_end timestamptz;

create unique index if not exists user_entitlements_stripe_sub_idx
  on public.user_entitlements (stripe_subscription_id)
  where stripe_subscription_id is not null;

create unique index if not exists user_entitlements_stripe_customer_idx
  on public.user_entitlements (stripe_customer_id)
  where stripe_customer_id is not null;
