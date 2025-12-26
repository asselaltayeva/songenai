# Songenai (Song + Generation AI)

Songenai is a full-stack platform that enables users to create songs using AI models.  
Users can generate custom music through three modes: **Simple** (description-based), **Custom** (user-provided lyrics and style), and **Instrumental**.

The system implements a credit-based model, background queue processing with Inngest, and social authentication via Better Auth and Firebase. The backend handles AI music generation, lyric creation, thumbnail generation, and cloud storage, while the frontend provides an intuitive interface for all generation modes.

---

## Core Capabilities

- AI music generation using the ACE-Step diffusion model (up to 180s audio)
- Smart lyric generation with Qwen2-7B-Instruct LLM
- Automatic album art generation using Stable Diffusion XL Turbo
- Three generation modes: simple description, custom lyrics, instrumental
- Credit system with 100 free credits
- Google OAuth with Better Auth
- Community feed to publish, like, search, and discover tracks
- Background queue processing with retry logic (Inngest)
- Secure audio and image playback via AWS S3 presigned URLs

---

## Architecture Overview

- **Database Resources (5):**
  - User
  - Song
  - Like
  - Category
  - Session

- **Backend**
  - 38+ REST endpoints
  - JWT-based authentication with RBAC (2 roles)
  - Pagination, sorting, and search
  - Unified error handling (12+ HTTP status codes)

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

### Backend
- Next.js API Routes
- Modal (serverless GPU execution)
- Prisma ORM

### Database
- PostgreSQL (Neon)
- Redis (sessions and caching)

### AI / ML
- ACE-Step (music generation)
- Qwen2-7B-Instruct (lyrics and tags)
- Stable Diffusion XL Turbo (images)

### Authentication
- Better Auth (JWT)
- Firebase Auth (social login)
- RBAC (2 roles)

### Infrastructure
- Modal L40S GPUs
- AWS S3
- Inngest

### Deployment
- Neon (database)
- Vercel

---

## Quick Links

- **Main Repository:**  
  https://github.com/asselaltayeva/songenai

- **Live Demo (Vercel):**  
  https://songenai.vercel.app/

- **Backend Repository:**  
  https://github.com/asselaltayeva/ai-music-generator-backend

- **Frontend Repository:**  
  https://github.com/asselaltayeva/ai-music-generator-frontend

- **Modal AI Endpoints:**  
  https://asselaltayeva--music-generator-musicgenserver-generate.modal.run

---

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
modal run main.py
modal deploy main.py

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev


---

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| POST | /api/auth/sign-in | Email and password login | No |
| POST | /api/auth/sign-up | User registration | No |
| POST | /api/auth/sign-out | Logout | Yes |
| GET | /api/auth/session | Get current session | Yes |
| POST | /api/auth/session/refresh | Refresh JWT token | Yes |
| GET | /api/auth/callback/google | Google OAuth callback | No |
| POST | /api/auth/reset-password | Password reset | No |

---

### Song Generation Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| POST | /actions/generateSong | Queue AI song generation (creates 2 songs) | Yes |
| POST | /actions/getPlayUrl | Get presigned S3 playback URL | Yes |

---

### Song Management Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| GET | /api/songs | List all songs (pagination, filters) | Yes |
| GET | /api/songs/[id] | Get song details | Yes |
| GET | /api/songs/user/[userId] | Get songs by user | Yes |
| GET | /api/songs/published | Published songs feed | Yes |
| GET | /api/songs/liked | User's liked songs | Yes |
| GET | /api/songs/search | Search songs | Yes |
| GET | /api/songs/trending | Trending songs | Yes |
| POST | /api/songs/[id]/increment-listen | Increment listen count | Yes |
| PATCH | /actions/setPublishedStatus | Publish or unpublish song | Yes |
| PATCH | /actions/renameSong | Rename song | Yes |
| POST | /actions/toggleLikeSong | Like or unlike song | Yes |
| DELETE | /api/songs/[id] | Delete song | Yes |
| GET | /api/songs/[id]/thumbnail | Get song thumbnail URL | Yes |

---

### Modal AI Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| POST | /modal/generate_from_description | Generate music from description | Modal Key |
| POST | /modal/generate_with_lyrics | Generate music with custom lyrics | Modal Key |
| POST | /modal/generate_with_described_lyrics | Generate music from lyric description | Modal Key |

---

### User Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| GET | /api/users | List all users | Yes |
| GET | /api/users/[id] | Get user profile | Yes |
| GET | /api/users/[id]/stats | User generation statistics | Yes |
| PATCH | /api/users/[id] | Update user profile | Yes |
| POST | /api/users/[id]/credits | Add credits (admin only) | Yes |
| GET | /api/users/me | Get current user | Yes |

---

### Category Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| GET | /api/categories | List all categories | Yes |
| GET | /api/categories/[name]/songs | Get songs by category | Yes |
| POST | /api/categories | Create new category (admin only) | Yes |

---

### Inngest Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| POST | /api/inngest | Inngest webhook handler | Inngest Key |

---

### System Endpoints

| Method | Endpoint | Description | Auth |
|------|---------|-------------|------|
| GET | /api/health | Health check and version info | No |
| GET | /api/status | Service status (DB, Redis, S3) | No |

---

## Pagination, Sorting, and Filtering

All list endpoints support the following query parameters:

- `page`: Page number (default: 0)
- `size`: Items per page (default: 20, max: 100)
- `sort`: Sort by date
- `category`: Filter by category name
- `status`: queued, processing, processed, failed
- `q` or `keyword`: Search by title or description

