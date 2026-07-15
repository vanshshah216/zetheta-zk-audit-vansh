-- Zero Knowledge Audit Marketplace — Supabase Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('audited', 'auditor', 'investor')),
  company_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_requests (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  company_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  audit_type TEXT NOT NULL,
  budget NUMERIC NOT NULL DEFAULT 0,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  deadline TIMESTAMPTZ NOT NULL,
  compliance_standard TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'accepted', 'completed', 'rejected', 'failed')),
  documents_count INTEGER NOT NULL DEFAULT 0,
  industry TEXT NOT NULL DEFAULT 'Other',
  assigned_auditor_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proofs (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  audit_id TEXT NOT NULL REFERENCES audit_requests(id) ON DELETE CASCADE,
  audit_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('verified', 'failed', 'pending')),
  hash TEXT NOT NULL,
  blockchain_tx_hash TEXT,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('verified', 'failed', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  audit_id TEXT NOT NULL REFERENCES audit_requests(id) ON DELETE CASCADE,
  company_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  audit_type TEXT NOT NULL,
  issue_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expiry_date TIMESTAMPTZ NOT NULL,
  compliance_standard TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
  verification_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verification_history (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  proof_id TEXT NOT NULL REFERENCES proofs(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details TEXT NOT NULL DEFAULT '',
  result TEXT NOT NULL CHECK (result IN ('success', 'failure')),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  company_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  audit_id TEXT REFERENCES audit_requests(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_audit_requests_company_id ON audit_requests(company_id);
CREATE INDEX IF NOT EXISTS idx_audit_requests_status ON audit_requests(status);
CREATE INDEX IF NOT EXISTS idx_audit_requests_assigned_auditor ON audit_requests(assigned_auditor_id);
CREATE INDEX IF NOT EXISTS idx_proofs_audit_id ON proofs(audit_id);
CREATE INDEX IF NOT EXISTS idx_certificates_company_id ON certificates(company_id);
CREATE INDEX IF NOT EXISTS idx_verification_history_proof_id ON verification_history(proof_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- ---------------------------------------------------------------------------
-- Updated-at trigger
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles', 'audit_requests', 'proofs', 'certificates',
    'verification_history', 'notifications', 'payments'
  ]
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_updated_at ON %I; CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();',
      t, t
    );
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Demo policies below allow full anon access (required for client-side Supabase
-- with mock auth). Before a public launch with real users, run
-- supabase/rls-production.sql after migrating to Supabase Auth.
-- ---------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
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

-- MVP: allow authenticated anon key access (required for client-side Supabase with mock auth)
CREATE POLICY "mvp_profiles_all" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "mvp_audit_requests_all" ON audit_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "mvp_proofs_all" ON proofs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "mvp_certificates_all" ON certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "mvp_verification_history_all" ON verification_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "mvp_notifications_all" ON notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "mvp_payments_all" ON payments FOR ALL USING (true) WITH CHECK (true);
