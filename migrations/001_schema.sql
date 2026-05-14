-- Services (lesson types)
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_es text not null,
  description text,
  description_es text,
  duration_minutes int not null default 60,
  price_usd numeric(10,2) not null,
  icon text,
  is_active bool default true,
  sort_order int default 0
);

-- Bookings
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id),
  customer_name text not null,
  email text not null,
  country text,
  spanish_level text check (spanish_level in ('beginner','intermediate','advanced','not_sure')),
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text default 'pending' check (status in ('pending','confirmed','cancelled')),
  notes text,
  created_at timestamptz default now()
);

-- Working hours (single tutor)
create table if not exists working_hours (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active bool default true
);

-- Blocked slots (days off / holidays)
create table if not exists blocked_slots (
  id uuid primary key default gen_random_uuid(),
  start_time timestamptz not null,
  end_time timestamptz not null,
  reason text
);
