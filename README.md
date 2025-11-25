# Open-Source Contributor Catalyst

A premium full-stack application for discovering open-source contribution opportunities with real-time GitHub integration, NLP-powered skill extraction, and a stunning Riot Games-inspired UI.

![Hero Section](https://via.placeholder.com/1200x600/000000/ff4655?text=CATALYST)

## 🚀 Features

### Frontend
- **Premium UI**: Riot Games-inspired design with Tungsten typography
- **Full-Screen Hero**: Dramatic animations and gradient effects
- **Advanced Search**: Real-time filtering with Elasticsearch
- **Responsive Design**: Mobile-first approach with smooth animations

### Backend
- **GitHub Integration**: Real-time issue ingestion via GraphQL API
- **NLP Processing**: Automated skill extraction from issue descriptions
- **Complexity Scoring**: Algorithm-based difficulty assessment
- **Fast Search**: Elasticsearch-powered fuzzy search

### Infrastructure
- **PostgreSQL**: User data and saved issues
- **Redis**: Job queue for async processing
- **Elasticsearch**: High-performance search index
- **Docker**: One-command local development setup

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (React)
- TypeScript
- Tailwind CSS
- Custom CSS animations

**Backend:**
- NestJS (Node.js)
- TypeORM
- Bull (Redis queue)
- Passport (OAuth)

**Infrastructure:**
- Docker & Docker Compose
- PostgreSQL 15
- Redis 7
- Elasticsearch 8.11

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Docker Desktop
- GitHub Personal Access Token

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-source-catalyst.git
   cd open-source-catalyst
   ```

2. **Start infrastructure**
   ```bash
   docker compose up -d
   ```

3. **Configure environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your GitHub Personal Access Token
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

5. **Start development servers**
   ```bash
   # Backend (terminal 1)
   cd backend
   npm run start:dev

   # Frontend (terminal 2)
   cd frontend
   npm run dev
   ```

6. **Ingest GitHub data**
   ```bash
   curl -X POST http://localhost:3001/ingestion/webhook \
     -H "Content-Type: application/json" \
     -d '{"trigger":"manual"}'
   ```

7. **Visit the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🎨 Design Inspiration

Inspired by Riot Games' bold aesthetic featuring:
- Tungsten & DIN typography
- Angled clip-path elements
- Dramatic gradients and shadows
- Premium hover animations
- Full-screen immersive experiences

## 📝 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=catalyst

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Elasticsearch
ELASTIC_NODE=http://localhost:9200

# GitHub
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_pat_here

# App
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 🏗️ Project Structure

```
open-source-catalyst/
├── backend/                # NestJS API
│   ├── src/
│   │   ├── auth/          # GitHub OAuth
│   │   ├── users/         # User management
│   │   ├── ingestion/     # GitHub data pipeline
│   │   ├── search/        # Elasticsearch integration
│   │   └── issues/        # Issue entities
│   └── package.json
├── frontend/              # Next.js UI
│   ├── src/
│   │   ├── pages/         # Routes
│   │   ├── lib/           # API client
│   │   └── styles/        # Global CSS
│   └── package.json
├── docker-compose.yml     # Infrastructure setup
└── README.md
```

## 🔥 Features in Detail

### GitHub Integration
- Fetches issues using GraphQL API
- Filters for "good first issue" labels
- Real-time webhook support (optional)
- Rate limit management

### NLP Skill Extraction
- Regex-based keyword matching
- Extracts: React, Vue, Angular, Python, Go, Rust, etc.
- Combines with GitHub labels
- Customizable skill dictionary

### Complexity Scoring
- Algorithm based on:
  - Issue labels (beginner, help wanted, bug, feature)
  - Comment count
  - Activity level
- Normalized 0-100 score
- Categorized: Low, Medium, High

### Search & Filters
- Full-text search with fuzzy matching
- Filter by skill tags
- Filter by complexity
- Sort by recency
- Pagination support

## 🚧 Roadmap

- [ ] Advanced filters (language, activity, project size)
- [ ] User authentication and profiles
- [ ] Save/bookmark issues
- [ ] Personalized recommendations
- [ ] Email notifications
- [ ] GitHub webhook integration
- [ ] AWS deployment
- [ ] Mobile app (React Native)

## 📄 License

MIT License - feel free to use this project for learning or building your own version!

## 🙏 Acknowledgments

- Riot Games for design inspiration
- GitHub for the fantastic GraphQL API
- The open-source community

## 📞 Contact

Built with ❤️ for the open-source community

---

**Star ⭐ this repo if you find it helpful!**
