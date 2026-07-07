import { Feature, AuditCase, TimelineStep, Stat, Testimonial, FAQItem } from './types'

export const features: Feature[] = [
  {
    title: 'Zero Knowledge Proofs',
    description: 'Cryptographic verification without revealing underlying data or source code',
    color: 'cyan',
    icon: null,
  },
  {
    title: 'Decentralized Audits',
    description: 'Distributed auditor network ensures unbiased and transparent security reviews',
    color: 'blue',
    icon: null,
  },
  {
    title: 'Smart Contract Focus',
    description: 'Specialized expertise in blockchain, DeFi, and Web3 security vulnerabilities',
    color: 'emerald',
    icon: null,
  },
  {
    title: 'Real-time Reporting',
    description: 'Live vulnerability tracking with instant notifications and mitigation paths',
    color: 'purple',
    icon: null,
  },
  {
    title: 'Compliance Ready',
    description: 'Generate audit reports compatible with SOC2, ISO27001, and regulatory standards',
    color: 'cyan',
    icon: null,
  },
  {
    title: 'AI-Enhanced Analysis',
    description: 'Machine learning powered code analysis combined with human expert review',
    color: 'blue',
    icon: null,
  },
  {
    title: 'Global Auditor Pool',
    description: 'Access to 10,000+ vetted security professionals across 50+ countries',
    color: 'emerald',
    icon: null,
  },
  {
    title: 'Instant Fixes',
    description: 'Integrated remediation assistance with pull request suggestions and patches',
    color: 'purple',
    icon: null,
  },
  {
    title: 'Lifetime Access',
    description: 'Permanent audit records and continuous monitoring for long-term protection',
    color: 'cyan',
    icon: null,
  },
]

export const auditCases: AuditCase[] = [
  {
    id: '1',
    title: 'Liquidity Pool Smart Contract',
    description: 'Advanced AMM implementation with impermanent loss protection mechanisms',
    category: 'DeFi',
    difficulty: 'hard',
    reward: 50000,
    auditors: 47,
    image: 'https://images.unsplash.com/photo-1639762681033-6461c9d43029?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Cross-chain Bridge Protocol',
    description: 'Multi-signature validation for inter-blockchain asset transfers',
    category: 'Infrastructure',
    difficulty: 'hard',
    reward: 75000,
    auditors: 28,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504504?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'NFT Marketplace Contract',
    description: 'ERC-721 and ERC-1155 token management with royalty system',
    category: 'NFT',
    difficulty: 'medium',
    reward: 30000,
    auditors: 62,
    image: 'https://images.unsplash.com/photo-1620321503375-539c8e0d0d20?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Governance DAO Token',
    description: 'Voting mechanism with time-weighted delegation and proposal creation',
    category: 'Governance',
    difficulty: 'medium',
    reward: 40000,
    auditors: 55,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Staking Protocol v2',
    description: 'Yield optimization with dynamic APY calculations and slashing logic',
    category: 'DeFi',
    difficulty: 'hard',
    reward: 60000,
    auditors: 41,
    image: 'https://images.unsplash.com/photo-1621794424906-7584bcbea968?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    title: 'Testnet API Gateway',
    description: 'REST API authentication and rate limiting for blockchain nodes',
    category: 'Infrastructure',
    difficulty: 'easy',
    reward: 15000,
    auditors: 78,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
]

export const timelineSteps: TimelineStep[] = [
  {
    number: 1,
    title: 'Submit Code',
    description: 'Upload your smart contract or application to our secure platform',
    details: [
      'Support for Solidity, Rust, TypeScript, Python',
      'Automatic code analysis with AI preliminary scan',
      'Zero-knowledge proof of code submitted',
    ],
  },
  {
    number: 2,
    title: 'Network Auction',
    description: 'Auditors compete to review your code with transparent bidding',
    details: [
      'Decentralized auditor matching algorithm',
      'Real-time bid monitoring dashboard',
      'Auditor reputation and past performance visible',
    ],
  },
  {
    number: 3,
    title: 'Expert Review',
    description: 'Selected auditors perform deep security analysis over 7-14 days',
    details: [
      'Multi-disciplinary auditor team assignment',
      'Live finding tracking and communication',
      'Continuous vulnerability documentation',
    ],
  },
  {
    number: 4,
    title: 'Generate Report',
    description: 'Comprehensive audit report with findings, fixes, and recommendations',
    details: [
      'Executive summary with risk dashboard',
      'Detailed vulnerability breakdown by severity',
      'Remediation guidance and code suggestions',
    ],
  },
]

export const stats: Stat[] = [
  { label: 'Smart Contracts Audited', value: '1,247', suffix: '+' },
  { label: 'Security Professionals', value: '10,000', suffix: '+' },
  { label: 'Vulnerabilities Found', value: '24,500', suffix: '+' },
  { label: 'Audit Success Rate', value: '99.8', suffix: '%' },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Alex Chen',
    role: 'Lead Developer',
    company: 'Quantum Finance',
    content:
      'The audit process was incredibly thorough and transparent. The auditors found critical issues we missed internally. Game-changing platform.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'Nova Protocol',
    content:
      'Outstanding experience. The decentralized approach gave us confidence in the independence of the audit. Highly recommended.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Security Lead',
    company: 'Crypto Vault Inc',
    content:
      'Best security audit experience we have had. The team was professional, responsive, and found vulnerabilities we needed to address immediately.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 5,
  },
]

export const faqs: FAQItem[] = [
  {
    question: 'How long does a typical smart contract audit take?',
    answer:
      'Most audits are completed within 7-14 days depending on code complexity. Simple contracts may be reviewed in 3-5 days, while complex DeFi protocols typically take 2-3 weeks. We provide real-time progress updates throughout the entire process.',
  },
  {
    question: 'What programming languages do you support?',
    answer:
      'We primarily focus on Solidity for EVM-compatible blockchains, but our network also includes experts in Rust (for Solana, Near), Move (for Aptos, Sui), TypeScript, and Python. Contact us for language-specific inquiries.',
  },
  {
    question: 'How are auditor fees determined?',
    answer:
      'Auditor fees depend on code complexity, lines of code, required expertise, and timeline urgency. Our AI system provides an initial estimate within minutes. You can then review auditor bids and select the team that best fits your needs and budget.',
  },
  {
    question: 'Is my code kept confidential?',
    answer:
      'Absolutely. We use zero-knowledge proofs to verify code without exposing it. All auditors sign strict NDAs. Code is stored on encrypted servers with role-based access control. We never share or publish audit details without explicit consent.',
  },
  {
    question: 'What happens if vulnerabilities are found?',
    answer:
      'We provide a detailed report with severity levels, descriptions, and remediation guidance. For critical issues, our AI suggests code fixes. You get 30 days of free follow-up audits to verify remediation. We are committed to helping you secure your code.',
  },
  {
    question: 'Can I get audit reports certified for regulatory compliance?',
    answer:
      'Yes. We generate reports compatible with SOC2, ISO27001, and other compliance frameworks. Add-on certification services are available. Audits can be structured to meet specific regulatory requirements for your jurisdiction.',
  },
]

export const trustedCompanies = [
  { name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
  { name: 'Aave', logo: 'https://cryptologos.cc/logos/aave-aave-logo.png' },
  { name: 'Uniswap', logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png' },
  { name: 'Arbitrum', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
  { name: 'Optimism', logo: 'https://cryptologos.cc/logos/optimism-op-logo.png' },
  { name: 'Lido', logo: 'https://cryptologos.cc/logos/lido-dao-ldo-logo.png' },
]
