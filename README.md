# IntelliInvest ValueResearch

**AI-Powered Value Investing Research Platform for Indian Stock Market**

A comprehensive fundamental analysis platform that helps identify undervalued companies using agentic AI, powered by Claude Sonnet 4.

---

## 🎯 Features

### 📊 Comprehensive Research
- **Sector Analysis**: Industry overview, market size, growth drivers, competitive dynamics
- **Company Deep-Dive**: 50+ parameters across financials, valuation, governance, qualitative factors
- **Peer Comparison**: Side-by-side comparison of companies in same sector
- **Risk Assessment**: 10+ risk categories with mitigation strategies

### 🤖 AI-Powered Analysis
- **Agentic Workflow**: Claude orchestrates multi-step research using specialized tools
- **Classification System**: Automatically categorizes companies (Leader, Challenger, Steady Performer, Struggling, Dark Horse)
- **Investment Thesis**: AI generates comprehensive investment recommendations
- **Weighted Scorecard**: Interactive sliders to customize investment criteria

### 📱 User Experience
- **Tab-Based Workflow**: Research → Analysis → Recommendations
- **Sector/Sub-Sector Selection**: Organized hierarchy of industries
- **Cache & Save**: Store research for offline access
- **Export**: Generate formatted Excel/Word reports

### 💰 Cost-Effective Development
- **Stub-First Architecture**: Develop with zero API costs
- **Toggle Real/Mock**: Switch between stub and real data with environment variable
- **Production Ready**: Seamless transition from development to production

---

## 🏗️ Architecture
```
┌─────────────────────────────────┐
│   Mobile UI (React Native)      │
│   Tab-based Workflow             │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│  AI Orchestrator (Claude)       │
│  25+ Tools for Research          │
└──────────────┬──────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────────┐   ┌────────▼─────┐
│ Data APIs  │   │  Storage     │
│ (Stub/Real)│   │  (DB/Cache)  │
└────────────┘   └──────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- (Optional) PostgreSQL for persistence
- (Optional) Redis for caching

### Installation
```bash
# Clone repository
git clone https://github.com/arjunwadkar/IntelliInvest_ValueResearch.git
cd IntelliInvest_ValueResearch

# Install all dependencies
npm run install-all

# Set up environment (starts with stubs - no API keys needed!)
cd backend
cp .env.example .env

# Start backend (stub mode - zero cost!)
npm run dev

# In new terminal, start mobile
cd ../mobile
npm start
# Press 'w' for web
```

### Development with Stubs (Recommended)
```bash
# backend/.env
USE_STUBS=true
USE_REAL_AI=false
ENABLE_CACHE=false

# No API keys needed! Start coding immediately.
```

### Production with Real APIs
```bash
# backend/.env
USE_STUBS=false
USE_REAL_AI=true
ENABLE_CACHE=true

# Add API keys:
ANTHROPIC_API_KEY=sk-ant-your-key
FMP_API_KEY=your-key
ALPHA_VANTAGE_API_KEY=your-key
```

---

## 📚 Available Stub Data

Pre-loaded with comprehensive data for:

**IT Services Sector:**
- TCS (Leader)
- Infosys (Challenger)
- Wipro (Struggling)
- HCL Tech (Steady Performer)
- Tech Mahindra (Steady Performer)

**Banking Sector:**
- HDFC Bank
- ICICI Bank
- Axis Bank
- Kotak Mahindra Bank
- SBI

Each company includes:
- 4 years of financial data
- 50+ financial ratios
- Forensic analysis
- Qualitative assessment
- Risk analysis
- Investment recommendation
- Valuation (DCF, Graham, Relative)

---

## 🛠️ Tech Stack

### Backend
- **Node.js + TypeScript**: Core runtime
- **Express**: REST API
- **Claude Sonnet 4**: AI orchestration
- **PostgreSQL**: Structured data storage
- **Redis**: Response caching
- **ExcelJS/Docx**: Report generation

### Mobile
- **React Native + Expo**: Cross-platform mobile
- **React Native Paper**: Material Design UI
- **React Navigation**: Tab-based navigation
- **Axios**: API communication

### Shared
- **TypeScript**: Shared type definitions
- **Zod**: Runtime type validation

---

## 📖 Usage

### Basic Flow

1. **Select Sector**: Choose from dropdown (e.g., "IT Services")
2. **Select Sub-Sector**: Refine selection if applicable
3. **Choose Mode**:
   - **Show Dummy Data**: See pre-filled template
   - **Show Cached**: Retrieve previous research
   - **Run New Search**: Fresh AI research
4. **Review Tabs**:
   - **Tab 1 - Research**: Sector overview + company details
   - **Tab 2 - Analysis**: Classification and comparison
   - **Tab 3 - Recommendations**: Investment thesis + scorecard
5. **Export**: Download Excel/Word report
6. **Save**: Store for later reference

### Example Queries (in AI mode)
```
"Analyze IT Services sector"
"Compare TCS and Infosys"
"Which banking stocks are undervalued?"
"Find companies with ROE >25% and P/E <20"
```

---

## 🔧 Development

### Project Structure
```
├── backend/          # Node.js API server
│   ├── src/
│   │   ├── services/ # Data, Analysis, Export services
│   │   ├── ai/       # Claude orchestrator
│   │   └── config/   # Environment configuration
│   └── stubs/        # Mock data for development
├── mobile/           # React Native app
│   └── src/
│       ├── screens/  # UI screens
│       ├── components/
│       └── services/
├── shared/           # Shared TypeScript types
└── database/         # SQL schemas and migrations
```

### Adding New Sector

1. Create stub: `backend/stubs/sectors/your-sector.json`
2. Create company stubs: `backend/stubs/companies/*.json`
3. Update sector constants in `shared/src/constants/sectors.ts`
4. Test with `USE_STUBS=true`

### Running Tests
```bash
npm run test --workspaces
```

---

## 💡 Key Design Decisions

### Why Stub-First?
- **Zero cost development**: Code without API charges
- **Faster iteration**: No network delays
- **Offline development**: Work without internet
- **Predictable testing**: Same data every time

### Why Single AI Orchestrator?
- **Lower API costs**: One agent vs multiple
- **Better context**: Maintains state across tools
- **Simpler architecture**: Easier to debug
- **Flexible workflow**: Easy to modify logic

### Why Tab-Based UI?
- **Structured workflow**: Guides user through analysis
- **Matches mental model**: Research → Analyze → Decide
- **Better than chat**: For systematic analysis
- **Progressive disclosure**: Information when needed

---

## 📊 Cost Estimates

### Development (Stub Mode)
- **Claude API**: $0/month
- **Data APIs**: $0/month
- **Infrastructure**: $0/month (free tiers)
- **Total**: **$0/month** ✅

### Production (5 sectors/week)
- **Claude API**: ~$6.60/month
- **Data APIs**: $0/month (free tiers)
- **Infrastructure**: $0-20/month
- **Total**: **$6.60-26.60/month** ✅

---

## 🤝 Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 👤 Author

**Arjun Wadkar**

---

## 🙏 Acknowledgments

- **Anthropic Claude**: AI orchestration
- **Financial Modeling Prep**: Stock data
- **Alpha Vantage**: Backup data source
- **Screener.in**: Indian stock data

---

**Built with ❤️ for value investors**
