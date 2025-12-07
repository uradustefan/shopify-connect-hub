-- 1. Enum pentru roluri
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'creator');

-- 2. Enum pentru planuri
CREATE TYPE public.user_plan AS ENUM ('basic', 'legend', 'royal');

-- 3. Tabel profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  plan public.user_plan DEFAULT 'basic',
  plan_expires_at TIMESTAMPTZ,
  followers_count INTEGER DEFAULT 0,
  boxes_sold INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  is_creator BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel user_roles (securitate separată)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- 5. Tabel products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  tags TEXT[],
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel gift_boxes
CREATE TABLE public.gift_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  box_type TEXT NOT NULL,
  products JSONB DEFAULT '[]'::jsonb,
  total_value DECIMAL(10,2) DEFAULT 0,
  orders_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tabel rituals
CREATE TABLE public.rituals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  steps JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tabel moments
CREATE TABLE public.moments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  video_thumbnail TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Tabel orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_box_id UUID REFERENCES public.gift_boxes(id) ON DELETE SET NULL,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rituals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 11. Security Definer Function pentru verificare rol
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 12. RLS Policies pentru profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- 13. RLS Policies pentru user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 14. RLS Policies pentru products (public read)
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 15. RLS Policies pentru gift_boxes
CREATE POLICY "Gift boxes are viewable by everyone"
  ON public.gift_boxes FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own gift boxes"
  ON public.gift_boxes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own gift boxes"
  ON public.gift_boxes FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own gift boxes"
  ON public.gift_boxes FOR DELETE
  TO authenticated
  USING (auth.uid() = creator_id);

-- 16. RLS Policies pentru rituals
CREATE POLICY "Rituals are viewable by everyone"
  ON public.rituals FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own rituals"
  ON public.rituals FOR ALL
  TO authenticated
  USING (auth.uid() = creator_id);

-- 17. RLS Policies pentru moments
CREATE POLICY "Moments are viewable by everyone"
  ON public.moments FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own moments"
  ON public.moments FOR ALL
  TO authenticated
  USING (auth.uid() = creator_id);

-- 18. RLS Policies pentru orders
CREATE POLICY "Users can view their own orders as buyer"
  ON public.orders FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = creator_id);

CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- 19. Function pentru creare profil automat la signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    LOWER(REPLACE(COALESCE(new.raw_user_meta_data->>'full_name', SPLIT_PART(new.email, '@', 1)), ' ', '.')),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;

-- 20. Trigger pentru creare profil automat
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 21. Function pentru actualizare updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 22. Triggers pentru updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gift_boxes_updated_at
  BEFORE UPDATE ON public.gift_boxes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();