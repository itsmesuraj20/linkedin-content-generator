# Deploy LinkedIn Content Generator for FREE! 🚀

## Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free) or Render account (free)

## 📋 Deployment Steps

### 1. Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/linkedin-content-generator.git
git push -u origin main
```

### 2. Deploy Backend on Railway (FREE)

1. **Sign up at [Railway.app](https://railway.app)**
2. **Connect GitHub** and select your repository
3. **Select the backend folder** or create a new service
4. **Add Environment Variables:**
   ```
   GEMINI_API_KEY=AIzaSyAzND3kqePK8DDuatRqBj0TkTa21qrnB-8
   JWT_SECRET=your-super-secret-jwt-key-here
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   SPRING_PROFILES_ACTIVE=prod
   ```

5. **Add PostgreSQL Database:**
   - Go to your project dashboard
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set DATABASE_URL

6. **Deploy Settings:**
   - Root Directory: `/backend`
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/content-generator-0.0.1-SNAPSHOT.jar`

### 3. Deploy Frontend on Vercel (FREE)

1. **Sign up at [Vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Configure build settings:**
   - Framework Preset: `Next.js`
   - Root Directory: `/frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bG95YWwtZmxvdW5kZXItNTcuY2xlcmsuYWNjb3VudHMuZGV2JA
   CLERK_SECRET_KEY=sk_test_UqdTI61swKzn4SnEtz9YjECisxSNaotugiXc7IVHhg
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app/api
   ```

### 4. Update CORS Settings

After deployment, update your backend's CORS_ORIGINS environment variable on Railway:
```
CORS_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
```

## 🎉 You're Live!

Your LinkedIn Content Generator will be available at:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://your-app-name.railway.app`

## 💰 Free Tier Limits

- **Vercel**: 100GB bandwidth, unlimited static sites
- **Railway**: $5 free credit monthly (enough for small apps)
- **PostgreSQL**: Included with Railway free tier

## 🔧 Alternative: Deploy Backend on Render

If you prefer Render over Railway:

1. **Sign up at [Render.com](https://render.com)**
2. **Create a Web Service** from your GitHub repo
3. **Settings:**
   - Environment: `Docker`
   - Build Command: `docker build -t app ./backend`
   - Start Command: Not needed (uses Dockerfile)
   - Root Directory: `/`

4. **Add PostgreSQL:**
   - Create a PostgreSQL database on Render
   - Use the connection string in your environment variables

## 🚨 Security Notes

1. **Change JWT_SECRET** to a strong random string
2. **Update Clerk keys** if using in production
3. **Set up proper domain** in Clerk dashboard
4. **Enable HTTPS** (automatic on Vercel/Railway)

## 📱 Mobile Responsive

Your app is already mobile-responsive thanks to Tailwind CSS!

---

**Need help?** Check the deployment logs in your service dashboards for any issues.
