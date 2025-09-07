# LinkedIn Content Generator

A full-stack SaaS application that generates engaging LinkedIn posts using AI. Built with Spring Boot (Java) backend, Next.js 15 frontend, PostgreSQL database, and Google Gemini Pro API for AI integration.

## 🚀 Features

### Core MVP Features
- **User Authentication**: Email/password login with JWT security
- **AI Content Generation**: Generate 3 LinkedIn-style posts with different tones
- **Post Management**: Copy, save, and regenerate posts
- **History Tracking**: View and manage all saved posts
- **Responsive Design**: Clean, minimal UI that works on all devices

### Available Tones
- **Professional**: Formal and business-focused content
- **Casual**: Friendly and conversational tone
- **Storytelling**: Narrative and engaging approach

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.0 (Java 17)
- **Database**: PostgreSQL
- **Security**: JWT Authentication, Spring Security
- **AI Integration**: Google Gemini Pro API
- **Build Tool**: Maven

### Frontend
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Database Schema
```sql
-- Users table
users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
posts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  topic VARCHAR(255) NOT NULL,
  tone VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🏗 Project Structure

```
linkedin-content-generator/
├── backend/                          # Spring Boot API
│   ├── src/main/java/com/linkedincontent/contentgenerator/
│   │   ├── LinkedInContentGeneratorApplication.java
│   │   ├── config/
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   └── PostController.java
│   │   ├── dto/
│   │   │   ├── AuthResponse.java
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── GeneratePostRequest.java
│   │   │   ├── GeneratePostResponse.java
│   │   │   └── SavePostRequest.java
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   └── Post.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   └── PostRepository.java
│   │   ├── security/
│   │   │   ├── UserPrincipal.java
│   │   │   ├── CustomUserDetailsService.java
│   │   │   └── JwtAuthenticationFilter.java
│   │   ├── service/
│   │   │   ├── AuthService.java
│   │   │   ├── PostService.java
│   │   │   └── GeminiService.java
│   │   └── util/
│   │       └── JwtUtil.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── pom.xml
└── frontend/                         # Next.js Application
    ├── src/
    │   ├── app/
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   ├── history/
    │   │   │   └── page.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── register/
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── globals.css
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   └── PostCard.tsx
    │   ├── contexts/
    │   │   └── AuthContext.tsx
    │   ├── lib/
    │   │   ├── api.ts
    │   │   └── api-types.ts
    │   └── providers/
    │       └── ReactQueryProvider.tsx
    ├── .env.local
    ├── next.config.js
    ├── package.json
    └── tailwind.config.js
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.8+
- Google Gemini Pro API Key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkedin-content-generator/backend
   ```

2. **Set up PostgreSQL Database**
   ```bash
   # Create database
   createdb linkedin_content_db
   
   # Or use Docker
   docker run --name postgres-db -e POSTGRES_DB=linkedin_content_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
   ```

3. **Configure Environment Variables**
   
   Update `src/main/resources/application.properties`:
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/linkedin_content_db
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   
   # JWT Configuration
   jwt.secret=your_jwt_secret_key_here_make_it_long_and_secure
   jwt.expiration=86400000
   
   # Gemini Pro API Configuration
   gemini.api.key=your_gemini_api_key_here
   ```

4. **Get Google Gemini Pro API Key**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Add it to your `application.properties`

5. **Run the Backend**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   The API will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

4. **Run the Frontend**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Backend with Docker Compose

1. **Build and run with Docker Compose**
   ```bash
   cd backend
   
   # Build the application
   ./mvnw clean package -DskipTests
   
   # Run with Docker Compose
   docker-compose up -d
   ```

### Frontend Deployment

1. **Build for production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `POST /api/generate-post` - Generate LinkedIn posts
- `POST /api/posts/save` - Save a post
- `GET /api/posts/history` - Get user's saved posts

### Health Check
- `GET /api/health` - API health status

## 🔧 Configuration

### Environment Variables

#### Backend (`application.properties`)
```properties
# Server Configuration
server.port=8080

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/linkedin_content_db
spring.datasource.username=postgres
spring.datasource.password=password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000

# Gemini Pro API
gemini.api.key=your_gemini_api_key
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent

# CORS
cors.allowed.origins=http://localhost:3000
```

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 🚀 Production Deployment

### Backend Deployment Options

1. **Render**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy automatically

2. **AWS/GCP**
   - Use Docker image
   - Configure environment variables
   - Set up PostgreSQL instance

3. **Heroku**
   ```bash
   # Add Heroku PostgreSQL addon
   heroku addons:create heroku-postgresql:hobby-dev
   
   # Deploy
   git push heroku main
   ```

### Frontend Deployment

1. **Vercel (Recommended)**
   ```bash
   vercel --prod
   ```

2. **Netlify**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`

### Database Options

1. **Supabase** (Recommended)
   - Easy PostgreSQL hosting
   - Built-in dashboard
   - Generous free tier

2. **AWS RDS**
   - Production-ready PostgreSQL
   - Automatic backups
   - Scalable

3. **Google Cloud SQL**
   - Managed PostgreSQL
   - Integration with GCP services

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Usage

1. **Sign Up**: Create a new account or login
2. **Generate Posts**: Enter a topic and select tone
3. **Review Results**: Get 3 AI-generated LinkedIn posts
4. **Copy & Save**: Copy posts to clipboard or save for later
5. **View History**: Access all your saved posts anytime

## 🔒 Security

- JWT-based authentication
- Password hashing with BCrypt
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section below
2. Search existing GitHub issues
3. Create a new issue with detailed information

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check connection string and credentials
   - Verify database exists

2. **Gemini API Error**
   - Verify API key is correct
   - Check API quota and billing
   - Ensure proper internet connectivity

3. **JWT Token Issues**
   - Check JWT secret configuration
   - Verify token expiration settings
   - Clear browser localStorage if needed

4. **CORS Errors**
   - Verify CORS configuration in backend
   - Check frontend API URL configuration
   - Ensure both services are running

### Port Conflicts
- Backend: Change `server.port` in `application.properties`
- Frontend: Use `npm run dev -- -p 3001` for different port

## 🎯 Roadmap

### Phase 2 Features
- [ ] Post scheduling
- [ ] Multiple social platforms (Twitter, Facebook)
- [ ] Content templates
- [ ] Team collaboration
- [ ] Analytics dashboard
- [ ] Custom AI prompts
- [ ] Export to PDF/Word
- [ ] Dark mode
- [ ] Mobile app

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] Caching layer (Redis)
- [ ] Rate limiting
- [ ] Monitoring and logging
- [ ] CI/CD pipeline
- [ ] Load balancing
- [ ] Database optimization
