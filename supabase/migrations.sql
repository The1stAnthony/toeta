-- ─────────────────────────────────────────────────────────────────────────────
-- Toeta — Supabase migrations
-- Run each section in the Supabase SQL Editor (supabase.com → your project → SQL)
-- Safe to re-run — all statements use IF NOT EXISTS / IF EXISTS guards.
-- ─────────────────────────────────────────────────────────────────────────────


-- ── Migration 001: Initial schema ────────────────────────────────────────────
-- Run once when setting up a fresh Supabase project.

create table if not exists public.profiles (
  id               uuid        primary key references auth.users(id) on delete cascade,
  is_premium       boolean     not null default false,
  subscribed_since timestamptz,
  stripe_customer_id text,
  created_at       timestamptz not null default now()
);

-- Row-level security
alter table public.profiles enable row level security;

create policy if not exists "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role bypasses RLS (needed for webhook + admin signup routes)
grant all on public.profiles to service_role;


-- ── Migration 002: Diet & allergen preferences ───────────────────────────────
-- Adds personalisation columns for premium Spoonacular filtering.
-- Copy and paste just this block if profiles already exists.

alter table public.profiles
  add column if not exists diet      text default '',
  add column if not exists allergens text default '';

comment on column public.profiles.diet is
  'Spoonacular diet value — one of: vegetarian, vegan, gluten free, ketogenic, paleo, or empty';

comment on column public.profiles.allergens is
  'Comma-separated Spoonacular intolerances — e.g. "dairy,gluten,shellfish"';


-- ── Migration 003: App settings (key/value store) ────────────────────────────
-- Used internally by Toeta for operational flags — not user-facing.
-- Example: tracks the date the Spoonacular quota alert was last sent.

create table if not exists public.app_settings (
  key        text        primary key,
  value      text        not null,
  updated_at timestamptz not null default now()
);

-- Only the service role can read/write this table (no user-facing RLS policy needed)
alter table public.app_settings enable row level security;

grant all on public.app_settings to service_role;
