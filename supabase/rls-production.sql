-- Production RLS policies (run AFTER migrating to Supabase Auth)
-- Prerequisite: profiles.id must equal auth.users.id (UUID) for each user.
-- See DEPLOYMENT.md for the full migration checklist.

-- Drop demo policies
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'profiles', 'audit_requests', 'proofs', 'certificates',
        'verification_history', 'notifications', 'payments'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- Profiles: users read/update own row
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid()::text = id);

-- Audit requests: companies manage own; auditors see assigned + pending
CREATE POLICY "audit_requests_company_rw" ON audit_requests
  FOR ALL USING (auth.uid()::text = company_id)
  WITH CHECK (auth.uid()::text = company_id);
CREATE POLICY "audit_requests_auditor_read" ON audit_requests
  FOR SELECT USING (
    auth.uid()::text = assigned_auditor_id
    OR status = 'pending'
  );
CREATE POLICY "audit_requests_auditor_update" ON audit_requests
  FOR UPDATE USING (auth.uid()::text = assigned_auditor_id);

-- Proofs: readable by related company/auditor; writes by auditor role
CREATE POLICY "proofs_read" ON proofs
  FOR SELECT USING (true);
CREATE POLICY "proofs_auditor_write" ON proofs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()::text AND p.role = 'auditor'
    )
  );

-- Certificates: company reads own
CREATE POLICY "certificates_company_read" ON certificates
  FOR SELECT USING (auth.uid()::text = company_id);

-- Notifications: own only
CREATE POLICY "notifications_own" ON notifications
  FOR ALL USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Payments: company own only
CREATE POLICY "payments_company" ON payments
  FOR ALL USING (auth.uid()::text = company_id)
  WITH CHECK (auth.uid()::text = company_id);

-- Verification history: read for authenticated users
CREATE POLICY "verification_history_read" ON verification_history
  FOR SELECT USING (auth.role() = 'authenticated');
