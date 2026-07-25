-- Store orders (one-time product purchases via Stripe)

create table if not exists public.store_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  product_slug text not null,
  product_name text,
  product_sku text,
  amount_cents int,
  currency text default 'aud',
  stripe_session_id text,
  stripe_payment_intent_id text,
  status text not null default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists store_orders_stripe_session_idx
  on public.store_orders (stripe_session_id)
  where stripe_session_id is not null;

alter table public.store_orders enable row level security;

drop policy if exists "Orders: read own" on public.store_orders;
create policy "Orders: read own"
  on public.store_orders
  for select
  to authenticated
  using (auth.uid() = user_id);
