# 🚀 LinkedIn Content Generator - Complete Deployment Guide

## Prerequisites
- GitHub account (free)
- Supabase account (free) 
- Render.com account (free)
- Vercel account (free)

---

## 🗃️ Step 1: Setup Supabase Database

1. Go to [Supabase](https://supabase.com/) and sign up
2. Click "New Project"
3. Choose your organization
4. Set project name: `linkedin-content-generator`
5. Set a strong database password
6. Choose region closest to you
7. Click "Create new project"

### Get Database Connection Details:
1. Go to Project Settings → Database
2. Copy these values:
   - **Host**: `db.xxx.supabase.co`  
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: (your password)
   - **Port**: `5432`

### Format your DATABASE_URL:
```
postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

---

## 🖥️ Step 2: Deploy Backend on Render.com

1. Go to [Render.com](https://render.com/) and sign up
2. Click "New Web Service"
3. Connect your GitHub account
4. Select repository: `linkedin-content-generator`
5. Configure settings:
   - **Environment**: Docker
   - **Build Command**: (leave empty)
   - **Start Command**: (leave empty)  
   - **Port**: 8080

### Environment Variables:
Add these in Render dashboard:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres` |
| `DATABASE_USER` | `postgres` |
| `DATABASE_PASSWORD` | `[YOUR_SUPABASE_PASSWORD]` |
| `GEMINI_API_KEY` | `AIzaSyAzND3kqePK8DDuatRqBj0TkTa21qrnB-8` |
| `JWT_SECRET` | `mySecretKey12345mySecretKey12345mySecretKey12345` |
| `CORS_ORIGINS` | `https://your-frontend-url.vercel.app` |
| `PORT` | `8080` |

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://linkedin-content-generator-xxxx.onrender.com`)

---

## 🌐 Step 3: Deploy Frontend on Vercel

1. Go to [Vercel](https://vercel.com/) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Environment Variables:
Add in Vercel dashboard:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.onrender.com/api` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_your_clerk_key` |
| `CLERK_SECRET_KEY` | `sk_test_your_clerk_secret` |

5. Click "Deploy"
6. Wait for deployment (2-3 minutes)

### Update CORS in Backend:
1. Go back to Render.com
2. Update `CORS_ORIGINS` environment variable with your Vercel URL
3. Redeploy backend

---

## ✅ Step 4: Test Your Deployment

### Backend Health Check:
Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-09-09T...",
  "service": "LinkedIn Content Generator Backend"
}
```

### Frontend:
Visit: `https://your-frontend-url.vercel.app`

---

## 🔧 Troubleshooting

### Backend Issues:
- Check Render logs for errors
- Verify all environment variables are set
- Ensure Supabase connection string is correct

### Frontend Issues:
- Check Vercel build logs
- Verify `NEXT_PUBLIC_API_URL` points to your backend
- Check browser console for API errors

### Database Issues:
- Verify Supabase project is active
- Check database password and connection string
- Ensure IP allowlist includes all IPs (0.0.0.0/0) for Render

---

## 🎉 You're Live!

Your LinkedIn Content Generator is now deployed and accessible worldwide!

**Backend**: https://your-backend-url.onrender.com  
**Frontend**: https://your-frontend-url.vercel.app

Share your creation with the world! 🌍
