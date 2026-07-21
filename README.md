<div align="center">

# 🔐 Zero Knowledge Audit Marketplace

### *A privacy-first, trust-minimized compliance audit platform powered by Zero-Knowledge Proofs*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 Project Overview

**CONFIDENTIAL - Property of Zetheta Algorithms Private Limited
This repository contains proprietary code and trade secrets.
Unauthorized access, use, or distribution is strictly prohibited

Zero Knowledge Audit Marketplace** is a decentralized, enterprise-grade compliance audit platform that connects companies needing audits with professional auditors — while ensuring sensitive business data never leaves the audited company's control.

Instead of sharing raw financial and operational data, companies generate **Zero-Knowledge cryptographic proofs** that mathematically guarantee compliance without revealing the underlying data. Verifiers (investors, regulators, partners) can trustlessly confirm compliance through on-chain proof verification.

> **MVP Status:** Full frontend with simulated ZK proof generation and Supabase-backed audit lifecycle management.

---

## 🧩 Problem Statement

Traditional compliance audits require companies to:
- Share sensitive internal documents and financials with third-party auditors
- Trust centralized institutions to certify compliance
- Expose proprietary business data to potential competitors or bad actors
- Rely on paper certificates that are easy to forge and hard to verify

This creates a fundamental **privacy vs. trust trade-off** that no existing solution adequately resolves.

---

## ✅ Solution

Zero Knowledge Audit Marketplace eliminates this trade-off by:

- **🔒 Privacy-Preserving:** Companies prove compliance without revealing raw data
- **📜 Cryptographic Guarantees:** ZK proofs are mathematically verifiable, not trust-based
- **⛓️ Blockchain-Anchored:** Proof hashes are stored on-chain for immutable auditability
- **🏪 Marketplace Model:** Companies choose auditors based on reputation and specialty
- **🤝 Multi-Stakeholder:** Unified portal for Companies, Auditors, and Verifiers

---

## 👥 User Roles

### 🏢 Company (Audited Entity)
- Submit audit requests with compliance requirements and budget
- Track audit status and assigned auditor
- View generated ZK proofs and certificates in a private vault
- Download and share compliance certificates

### 🔍 Auditor
- Browse and accept incoming audit requests
- Manage assigned audits and deadlines
- Generate simulated ZK proofs for completed audits
- Issue compliance certificates upon verified proof
- Track earnings and reputation

### ✔️ Verifier (Investor / Regulator)
- Auto-fill or manually enter proof details for verification
- Run simulated on-chain proof verification steps
- Browse the proof explorer and verification history
- View and download compliance certificates from all companies

---

## ✨ Completed Features

| Feature | Status |
|---|---|
| Demo authentication (email + password) | ✅ Complete |
| Role-based dashboards (Company / Auditor / Verifier) | ✅ Complete |
| Session persistence across page refreshes | ✅ Complete |
| Logout flow with success toast | ✅ Complete |
| Company audit request creation form | ✅ Complete |
| Supabase-backed `audit_requests` table | ✅ Complete |
| Auditor incoming requests & accept flow | ✅ Complete |
| Auditor assigned audits view | ✅ Complete |
| Simulated ZK proof generation (8-step animation) | ✅ Complete |
| Supabase-backed `proofs` table | ✅ Complete |
| Certificate issuance by auditor | ✅ Complete |
| Supabase-backed `certificates` table | ✅ Complete |
| Verifier proof verification (5-step simulation) | ✅ Complete |
| Supabase-backed `verification_history` table | ✅ Complete |
| Auditor & Company Proof Vault | ✅ Complete |
| Certificate views across all portals | ✅ Complete |
| Local mock store fallback (Zustand + localStorage) | ✅ Complete |
| Loading states and error handling | ✅ Complete |
| Demo credentials click-to-fill on login page | ✅ Complete |
| Demo mode banners across all dashboards | ✅ Complete |
| Production build passing (53 pages) | ✅ Complete |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom Design System |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) with `localStorage` persistence |
| **Backend / Database** | [Supabase](https://supabase.com/) (PostgreSQL + REST API) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 🎭 Demo Credentials

> Use these credentials to test the full demo flow. Click-to-fill is available directly on the login page.

| Role | Email | Password |
|---|---|---|
| 🏢 **Company** | `company@example.com` | `password123` |
| 🔍 **Auditor** | `auditor@example.com` | `password123` |
| ✔️ **Verifier** | `verifier@example.com` | `password123` |

---

## 🚀 Main Demo Flow

Follow these steps to walk through the complete end-to-end lifecycle:

### Step 1 — Company Portal
1. Login as `company@example.com`
2. Go to **Request Audit** → fill out the form → submit
3. Check **My Audits** — your new request appears (fetched from Supabase)
4. Logout

### Step 2 — Auditor Portal
5. Login as `auditor@example.com`
6. Go to **Incoming Requests** — the company's audit request appears
7. Click **Accept** — status updates to `accepted` in Supabase
8. Go to **Assigned Audits** — the accepted audit appears
9. Go to **Generate Proof** → select the audit → click **Generate**
10. Watch the 8-step ZK proof simulation — proof is saved to Supabase
11. Go to **Proof Vault** — generated proof appears
12. Go to **Certificates** → click **Issue Certificate** — certificate saved to Supabase
13. Logout

### Step 3 — Verifier Portal
14. Login as `verifier@example.com`
15. Go to **Verify Proof** → click **Auto Fill Demo** (pulls from Supabase)
16. Click **Verify Proof** — runs 5-step verification simulation
17. Result is saved to `verification_history` in Supabase
18. Go to **History** — verification entry appears
19. Go to **Proof Explorer** — all proofs visible with status
20. Logout

---

## 🖥️ How to Run Locally

### Prerequisites
- Node.js 18+
- npm or pnpm
- A Supabase project (free tier is sufficient)

### Installation

```bash
# Clone the repository
git clone https://github.com/vanshshah216/ZE-Theta.git
cd ZE-Theta

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Fill in your Supabase credentials (see below)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note:** `.env.local` is already included in `.gitignore` and will never be committed to version control.

---

## 🗄️ Supabase Database Setup

### Step 1 — Create a Supabase Project
1. Go to [app.supabase.com](https://app.supabase.com) and sign up / log in
2. Click **New Project** and choose a region
3. Copy your **Project URL** and **Anon Key** into `.env.local`

### Step 2 — Run the SQL Schema
1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **+ New Query**
3. Paste the complete SQL schema from the project's SQL setup file
4. Click **Run** (Ctrl+Enter / Cmd+Enter)

### Tables Used

| Table | Purpose |
|---|---|
| `profiles` | User accounts with roles (company / auditor / investor) |
| `audit_requests` | All audit requests submitted by companies |
| `proofs` | ZK proofs generated by auditors |
| `certificates` | Compliance certificates issued post-verification |
| `verification_history` | All proof verification events by verifiers |
| `notifications` | In-app notifications per user (UI mocked) |
| `payments` | Escrow payment records per audit (UI mocked) |

### Row Level Security (RLS)
All tables have RLS enabled with **demo-friendly open policies** (`FOR ALL USING (true)`) to allow full access via the anon key during the MVP phase. These should be restricted to authenticated users before going to production.

---

## 🚢 Deployment on Vercel

### Option 1 — Deploy via Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 2 — Deploy via GitHub Integration
1. Push your repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

Vercel will automatically detect the Next.js project and configure the build settings correctly.

---

## 📁 Folder Structure

```
ZE-Theta/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Login, register, logout, role selection
│   ├── company/                  # Company portal pages
│   │   ├── dashboard/
│   │   ├── request-audit/
│   │   ├── my-audits/
│   │   ├── proof-vault/
│   │   ├── certificates/
│   │   └── ...
│   ├── auditor/                  # Auditor portal pages
│   │   ├── dashboard/
│   │   ├── incoming-requests/
│   │   ├── assigned-audits/
│   │   ├── generate-proof/
│   │   ├── proofs/
│   │   ├── certificates/
│   │   └── ...
│   ├── verifier/                 # Verifier portal pages
│   │   ├── dashboard/
│   │   ├── verify-proof/
│   │   ├── history/
│   │   ├── proofs/
│   │   ├── certificates/
│   │   └── ...
│   └── security/                 # Security admin pages
│
├── components/                   # Reusable React components
│   ├── company/                  # Company-specific components
│   ├── auditor/                  # Auditor-specific components
│   ├── verifier/                 # Verifier-specific components
│   ├── ds/                       # Design system (Button, Card, etc.)
│   └── navigation/               # Shared navigation components
│
├── stores/
│   ├── mock-store.ts             # Zustand store (mock state + localStorage)
│   └── auth-store.ts             # Authentication state store
│
├── services/
│   └── supabase-audit-service.ts # All Supabase CRUD functions
│
├── lib/
│   ├── supabase/
│   │   └── client.ts             # Supabase client initialization
│   ├── company/                  # Company mock data & utilities
│   └── verifier/                 # Verifier mock data & utilities
│
├── hooks/
│   ├── use-auth.ts               # Authentication hook
│   └── use-toast.ts              # Toast notification hook
│
├── types/
│   └── supabase.ts               # TypeScript interfaces for DB rows
│
├── providers/                    # React context providers
├── public/                       # Static assets
├── .env.local                    # Environment variables (not committed)
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## ⚠️ Current Limitations

This is an MVP demo. The following features are intentionally simulated:

| Limitation | Details |
|---|---|
| 🔑 **Mock Authentication** | Email/password checked against hardcoded demo credentials. No real Supabase Auth yet. |
| 🔬 **Simulated ZK Proofs** | ZK proof generation runs a visual 8-step animation. No real `circom`/`snarkjs` circuits are executed. |
| ⛓️ **Simulated Blockchain Hashes** | Blockchain transaction hashes are randomly generated hex strings. No real Ethereum/Sepolia transactions. |
| 👛 **No Wallet Login** | No MetaMask or WalletConnect integration yet. |
| 💳 **No Real Payments** | Escrow and payment logic is displayed in the UI but not connected to any payment rail. |
| 🔔 **Mocked Notifications** | In-app notifications are served from the local Zustand store, not from Supabase. |

---

## 🔭 Future Scope

| Feature | Description |
|---|---|
| 🔐 **Supabase Auth** | Replace mock credentials with real email/OAuth authentication and RLS policies scoped to `auth.uid()` |
| 👛 **Wallet Login** | MetaMask / WalletConnect integration for Web3 identity |
| 🔬 **Real ZK Circuits** | Implement `circom` circuits and `snarkjs` proof generation for actual zero-knowledge proofs |
| ⛓️ **Sepolia Smart Contract** | Deploy a Solidity verifier contract on Ethereum Sepolia testnet for on-chain proof anchoring |
| 📦 **IPFS Document Storage** | Store audit documents on IPFS instead of centralized servers |
| 💰 **Escrow Payments** | Integrate a smart contract escrow system for trustless auditor payments |
| 🤝 **Auditor Matching Algorithm** | AI-powered matching between company audit requirements and auditor specializations |
| 📊 **Analytics Dashboard** | Real-time analytics on audit volume, proof generation times, and marketplace activity |

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/vanshshah216/ZE-Theta/issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for the Web3 Compliance Era**

[🌐 Live Demo](https://ze-theta.vercel.app) · [📧 Contact](mailto:vanshshah216@gmail.com) · [🐛 Report Bug](https://github.com/vanshshah216/ZE-Theta/issues)

</div>
