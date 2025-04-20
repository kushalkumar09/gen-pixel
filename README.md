Absolutely! Here's your updated `README.md` file with **GenPixel** as the project name:

---

# 🖼️ GenPixel - AI-Powered Image Transformation App

**GenPixel** is a modern web application that allows users to upload images and apply a variety of AI-powered transformations like background removal, recoloring, object removal, and more. It uses **Next.js 13**, **Cloudinary**, **MongoDB**, and **Tailwind CSS** to deliver a seamless, full-stack image editing experience.

## ✨ Features

- 🔄 Apply powerful image transformations:
  - Restore
  - Recolor
  - Remove Background
  - Remove Objects
  - Fill with Custom Aspect Ratios
- ☁️ Upload and manage images via Cloudinary
- 👤 User authentication and credit-based system
- 💾 Save and update transformed images to a database
- 📐 Responsive and interactive design with live image previews

## 🔧 Tech Stack

- **Next.js 13 (App Router)**
- **Tailwind CSS**
- **MongoDB + Mongoose**
- **Cloudinary**
- **React Hook Form + Zod**
- **ShadCN UI Components**

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js (v18+)
- MongoDB (local or Atlas)
- A Cloudinary account

### Environment Setup

Create a `.env.local` file and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Installation

```bash
git clone https://github.com/yourusername/genpixel.git
cd genpixel
npm install
```

### Run Locally

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000`.

## 🧠 How It Works

1. **Upload** an image using the MediaUploader.
2. Choose a **transformation type** (e.g., recolor, remove background).
3. Input additional info (e.g., prompt or target color).
4. Click **Apply Transformation** – a transformation config is generated and applied via a Cloudinary URL.
5. Save the final transformed image – it's stored with metadata in MongoDB.

## 📁 Folder Structure

```bash
components/
  └── shared/
  └── transformation/
lib/
  └── actions/
  └── utils.ts
pages/
  └── transformations/
public/
styles/
```

## 💳 Credit System

Each transformation reduces a user's credit balance. The app checks if the user has enough credits before allowing transformations.

## 🧩 Transformation Flow

- **User uploads** → Transformation config is created → Cloudinary applies it → **Credits updated** → Transformed image saved

## 📜 License

This project is licensed under the MIT License.

---

Let me know if you want to add deployment instructions (e.g., for Vercel or Render) or a project logo at the top!
