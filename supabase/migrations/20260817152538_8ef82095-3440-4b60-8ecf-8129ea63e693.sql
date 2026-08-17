CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can read all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.saved_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  job_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, job_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_jobs TO authenticated;
GRANT ALL ON public.saved_jobs TO service_role;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saved jobs" ON public.saved_jobs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.job_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id text,
  title text NOT NULL,
  organization text NOT NULL,
  category text NOT NULL DEFAULT 'Other',
  notification_type text NOT NULL DEFAULT 'New Notification',
  description text,
  vacancies text,
  qualification text,
  application_start date,
  application_end date,
  exam_date date,
  admit_card_date date,
  result_date date,
  official_notification_url text,
  official_apply_url text,
  last_verified date,
  published boolean NOT NULL DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.job_notifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_notifications TO authenticated;
GRANT ALL ON public.job_notifications TO service_role;
ALTER TABLE public.job_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published notifications" ON public.job_notifications FOR SELECT USING (published = true);
CREATE POLICY "Admins can read all notifications" ON public.job_notifications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage notifications" ON public.job_notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_job_notifications_updated_at BEFORE UPDATE ON public.job_notifications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.validate_job_notification()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.application_start IS NOT NULL AND NEW.application_end IS NOT NULL
     AND NEW.application_end < NEW.application_start THEN
    RAISE EXCEPTION 'Closing date cannot be earlier than the opening date';
  END IF;
  IF NEW.application_start IS NOT NULL AND NEW.exam_date IS NOT NULL
     AND NEW.exam_date < NEW.application_start THEN
    RAISE EXCEPTION 'Exam date cannot be earlier than the application start date';
  END IF;
  IF NEW.published THEN
    IF NEW.official_notification_url IS NULL OR length(trim(NEW.official_notification_url)) = 0 THEN
      RAISE EXCEPTION 'A published notification requires an official source URL';
    END IF;
    IF NEW.last_verified IS NULL THEN
      RAISE EXCEPTION 'A published notification requires a last verified date';
    END IF;
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER trg_job_notifications_validate BEFORE INSERT OR UPDATE ON public.job_notifications
FOR EACH ROW EXECUTE FUNCTION public.validate_job_notification();