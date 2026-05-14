-- Seed services
insert into services (name, name_es, description, description_es, duration_minutes, price_usd, icon, sort_order) values
('Free Trial Lesson', 'Lección de Prueba Gratuita', '30-minute discovery call to assess your level and goals. No payment required.', 'Llamada de 30 minutos para evaluar tu nivel y objetivos. Sin pago requerido.', 30, 0, '🎁', 0),
('Conversational Spanish', 'Español Conversacional', 'Build real fluency through structured conversations on topics that matter to you. Perfect for travel, daily life, and connecting with Spanish speakers.', 'Desarrolla fluidez real a través de conversaciones estructuradas sobre temas que te importan. Perfecto para viajes, vida cotidiana y conectar con hispanohablantes.', 60, 35, '💬', 1),
('Business Spanish', 'Español de Negocios', 'Master professional Spanish for meetings, emails, presentations, and negotiations. Tailored vocabulary for your industry.', 'Domina el español profesional para reuniones, correos, presentaciones y negociaciones. Vocabulario adaptado a tu industria.', 60, 45, '💼', 2),
('DELE Exam Prep', 'Preparación DELE', 'Prepare for the official DELE Spanish proficiency exam. Structured curriculum covering all four skills with timed practice tests.', 'Prepárate para el examen oficial de español DELE. Plan de estudio estructurado que cubre las cuatro habilidades con exámenes prácticos cronometrados.', 60, 40, '📚', 3),
('Spanish for Travel', 'Español para Viajes', 'Crash-course Spanish for your upcoming trip. Practical phrases, cultural insights, and survival skills for real-world situations.', 'Curso intensivo de español para tu próximo viaje. Frases prácticas, información cultural y habilidades de supervivencia para situaciones reales.', 60, 35, '✈️', 4);

-- Seed working hours (Mon–Fri, 9am–6pm Mexico City time)
insert into working_hours (day_of_week, start_time, end_time, is_active) values
(1, '09:00:00', '18:00:00', true),
(2, '09:00:00', '18:00:00', true),
(3, '09:00:00', '18:00:00', true),
(4, '09:00:00', '18:00:00', true),
(5, '09:00:00', '16:00:00', true);
