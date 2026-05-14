-- Enable RLS
alter table services enable row level security;
alter table bookings enable row level security;
alter table working_hours enable row level security;
alter table blocked_slots enable row level security;

-- Public read: active services and working hours
create policy "public read services" on services for select using (is_active = true);
create policy "public read working_hours" on working_hours for select using (true);

-- Anyone can insert a booking (public booking form)
create policy "public insert bookings" on bookings for insert with check (true);
create policy "public read own booking" on bookings for select using (true);

-- Authenticated (admin) full access
create policy "admin manage bookings" on bookings for all using (auth.role() = 'authenticated');
create policy "admin manage services" on services for all using (auth.role() = 'authenticated');
create policy "admin manage working_hours" on working_hours for all using (auth.role() = 'authenticated');
create policy "admin manage blocked" on blocked_slots for all using (auth.role() = 'authenticated');
create policy "public read blocked" on blocked_slots for select using (true);
