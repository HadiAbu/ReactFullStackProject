-- SQL migration for posts table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS posts (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title TEXT NOT NULL,
content TEXT NOT NULL,
author TEXT,
tags TEXT[],
published BOOLEAN DEFAULT false,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);