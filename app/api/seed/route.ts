import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // 1. Seed Profiles
    const profiles = [
      { id: 'company-user', email: 'company@example.com', role: 'audited', company_name: 'Tech Corp' },
      { id: 'auditor-user', email: 'auditor@example.com', role: 'auditor', company_name: 'Audit Labs' },
      { id: 'verifier-user', email: 'verifier@example.com', role: 'investor', company_name: 'Verifier DAO' },
      { id: 'demo-user', email: 'demo@example.com', role: 'auditor', company_name: 'Demo Security' }
    ];

    for (const profile of profiles) {
      const { data: existing } = await supabase.from('profiles').select('id').eq('email', profile.email).single();
      if (!existing) {
        await supabase.from('profiles').insert([profile]);
      }
    }

    // 2. Seed Audit Requests
    const auditRequests = [
      {
        id: 'audit-req-1',
        company_id: 'company-user',
        company_name: 'Tech Corp',
        audit_type: 'Smart Contract',
        budget: 5000,
        priority: 'high',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        compliance_standard: 'SOC2',
        description: 'Pending audit for DeFi protocol',
        status: 'pending',
        documents_count: 3,
        industry: 'DeFi'
      },
      {
        id: 'audit-req-2',
        company_id: 'company-user',
        company_name: 'Tech Corp',
        audit_type: 'Zk-Rollup',
        budget: 10000,
        priority: 'critical',
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        compliance_standard: 'ISO27001',
        description: 'Completed audit for L2 solution',
        status: 'completed',
        documents_count: 5,
        industry: 'Infrastructure',
        assigned_auditor_id: 'auditor-user'
      }
    ];

    for (const req of auditRequests) {
      const { data: existing } = await supabase.from('audit_requests').select('id').eq('id', req.id).single();
      if (!existing) {
        await supabase.from('audit_requests').insert([req]);
      }
    }

    // 3. Seed Proofs
    const proofs = [
      {
        id: 'proof-1',
        audit_id: 'audit-req-2',
        audit_name: 'Zk-Rollup',
        company_name: 'Tech Corp',
        status: 'verified',
        hash: '0xabc123def456...',
        blockchain_tx_hash: '0x999888777666...',
        generated_at: new Date().toISOString(),
        verification_status: 'verified'
      }
    ];

    for (const proof of proofs) {
      const { data: existing } = await supabase.from('proofs').select('id').eq('id', proof.id).single();
      if (!existing) {
        await supabase.from('proofs').insert([proof]);
      }
    }

    // 4. Seed Certificates
    const certificates = [
      {
        id: 'cert-1',
        audit_id: 'audit-req-2',
        company_id: 'company-user',
        company_name: 'Tech Corp',
        audit_type: 'Zk-Rollup',
        issue_date: new Date().toISOString(),
        expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        compliance_standard: 'ISO27001',
        status: 'active',
        verification_hash: '0xabc123def456...'
      }
    ];

    for (const cert of certificates) {
      const { data: existing } = await supabase.from('certificates').select('id').eq('id', cert.id).single();
      if (!existing) {
        await supabase.from('certificates').insert([cert]);
      }
    }

    // 5. Seed Verification History
    const verificationHistories = [
      {
        id: 'vh-1',
        proof_id: 'proof-1',
        action: 'Proof Verified',
        details: 'ZK-SNARK proof validated against on-chain anchor',
        result: 'success',
        timestamp: new Date().toISOString()
      }
    ];

    for (const vh of verificationHistories) {
      const { data: existing } = await supabase.from('verification_history').select('id').eq('id', vh.id).single();
      if (!existing) {
        await supabase.from('verification_history').insert([vh]);
      }
    }

    return NextResponse.json({ success: true, message: 'Demo data seeded successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
