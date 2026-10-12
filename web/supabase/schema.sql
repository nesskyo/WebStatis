-- ==============================================================================
-- Schema SQL: Ness Agency Website v1.0
-- Supabase PostgreSQL Setup: Profiles Table, Triggers, & Row Level Security (RLS)
-- ==============================================================================

-- 1. Buat Tabel public.profiles (1:1 dengan auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Berikan komentar tabel
comment on table public.profiles is 'Menyimpan profil publik pengguna, terhubung dengan auth.users.';

-- 2. Trigger Function: Otomatis membuat profile saat pengguna baru mendaftar
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

-- Drop trigger jika sudah ada sebelumnya agar idempotent
drop trigger if exists on_auth_user_created on auth.users;

-- Buat trigger setelah insert pada auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Trigger Function: Otomatis memperbarui kolom updated_at saat data berubah
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Drop trigger jika sudah ada sebelumnya agar idempotent
drop trigger if exists profiles_set_updated_at on public.profiles;

-- Buat trigger sebelum update pada public.profiles
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 4. Aktifkan Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Hapus policy lama jika ada untuk menghindari duplikasi
drop policy if exists "User dapat membaca profil sendiri" on public.profiles;
drop policy if exists "User dapat mengubah profil sendiri" on public.profiles;
drop policy if exists "User dapat membuat profil sendiri" on public.profiles;

-- Policy 1: User dapat membaca profilnya sendiri
create policy "User dapat membaca profil sendiri"
  on public.profiles for select
  using (auth.uid() = id);

-- Policy 2: User dapat memperbarui profilnya sendiri
create policy "User dapat mengubah profil sendiri"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Policy 3: User dapat membuat profil sendiri jika trigger belum membuatkannya
create policy "User dapat membuat profil sendiri"
  on public.profiles for insert
  with check (auth.uid() = id);
