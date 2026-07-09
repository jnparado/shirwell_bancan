-- Apple In-App Purchase entitlements (synced from iOS app / App Store Server Notifications)

create table if not exists public.user_entitlements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  premium boolean not null default false,
  source text,
  product_id text,
  apple_original_transaction_id text,
  apple_expires_at timestamptz,
  updated_at timestamptz default now()
);

create unique index if not exists user_entitlements_apple_txn_idx
  on public.user_entitlements (apple_original_transaction_id)
  where apple_original_transaction_id is not null;

alter table public.user_entitlements enable row level security;

drop policy if exists "Entitlements: read own" on public.user_entitlements;
create policy "Entitlements: read own"
  on public.user_entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Inserts/updates come from service role (API routes / webhooks), not direct client writes.
