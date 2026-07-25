-- Admin users can read all profiles (for user management dashboard).
-- App still enforces admin role in Next.js before showing /admin routes.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and lower(coalesce(role, '')) in ('admin', 'superadmin')
  );
$$;

drop policy if exists "Profiles: admin read all" on public.profiles;
create policy "Profiles: admin read all"
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Entitlements: admin read all" on public.user_entitlements;
create policy "Entitlements: admin read all"
  on public.user_entitlements
  for select
  to authenticated
  using (public.is_admin());
