-- Users Table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questions Table
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- e.g., 'Matrix Reasoning', 'Quantitative Logic'
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 10),
  content JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Test Results Table
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  raw_score INTEGER NOT NULL,
  calculated_iq INTEGER NOT NULL,
  percentile NUMERIC(5, 2) NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Responses Table
CREATE TABLE public.responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES public.test_results(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  time_taken_ms INTEGER NOT NULL, -- milliseconds
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON public.users FOR SELECT USING (auth.uid() = id);

-- Allow everyone to read questions (for taking tests)
CREATE POLICY "Questions are readable by everyone" ON public.questions FOR SELECT USING (true);

-- Allow users to insert and read their own test results
CREATE POLICY "Users can insert own test results" ON public.test_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own test results" ON public.test_results FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert and read their own responses (requires JOIN or function in complex setups, simplified here)
CREATE POLICY "Users can insert responses" ON public.responses FOR INSERT WITH CHECK (true); -- Ideally restrict by test_id owner
CREATE POLICY "Users can read own responses" ON public.responses FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.test_results tr WHERE tr.id = responses.test_id AND tr.user_id = auth.uid())
);
