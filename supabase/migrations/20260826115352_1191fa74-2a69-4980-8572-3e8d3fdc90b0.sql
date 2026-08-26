DROP FUNCTION IF EXISTS public.validate_job_notification() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.touch_updated_at() FROM PUBLIC;