/*
  # Jewelry Management System Schema

  1. New Tables
    - `jewelry`
      - Primary jewelry information table
      - Stores basic details about each piece
    - `stones`
      - Stores information about precious stones
      - Links to jewelry through foreign key
    - `categories`
      - Lookup table for jewelry categories
    - `finishes`
      - Lookup table for jewelry finishes
    - `designers`
      - Lookup table for designer styles
    - `target_audiences`
      - Lookup table for target demographics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Changes
    - Initial schema creation
    - Setup of lookup tables
    - Creation of relationships between tables
*/

-- Create enum types for fixed options
CREATE TYPE stone_cut AS ENUM (
  'Round', 'Square', 'Oval', 'Pear', 'Marquise', 'Emerald', 'Princess', 'Cushion', 'Other'
);

-- Categories lookup table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Finishes lookup table
CREATE TABLE finishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Designers lookup table
CREATE TABLE designers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Target audiences lookup table
CREATE TABLE target_audiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Main jewelry table
CREATE TABLE jewelry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_name text NOT NULL,
  category_id uuid REFERENCES categories(id),
  weight decimal(10,2),
  finish_id uuid REFERENCES finishes(id),
  size text,
  designer_id uuid REFERENCES designers(id),
  target_audience_id uuid REFERENCES target_audiences(id),
  observations text,
  client_name text,
  width decimal(10,2),
  height decimal(10,2),
  length decimal(10,2),
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Stones table
CREATE TABLE stones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  jewelry_id uuid REFERENCES jewelry(id) ON DELETE CASCADE,
  stone_type text NOT NULL,
  cut stone_cut NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  quality text,
  carats decimal(10,3),
  width decimal(10,2),
  height decimal(10,2),
  length decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE finishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE target_audiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE jewelry ENABLE ROW LEVEL SECURITY;
ALTER TABLE stones ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read categories"
  ON categories FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read finishes"
  ON finishes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read designers"
  ON designers FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read target audiences"
  ON target_audiences FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can CRUD their own jewelry"
  ON jewelry FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can CRUD their own stones"
  ON stones FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert initial lookup data
INSERT INTO categories (name) VALUES
  ('Ring'),
  ('Earring'),
  ('Necklace'),
  ('Bracelet'),
  ('Wedding Ring'),
  ('Pendant'),
  ('Brooch'),
  ('Tiara');

INSERT INTO finishes (name) VALUES
  ('Polished'),
  ('Matte'),
  ('Textured'),
  ('Hammered'),
  ('Brushed'),
  ('Antique');

INSERT INTO designers (name) VALUES
  ('Classic'),
  ('Modern'),
  ('Vintage'),
  ('Contemporary'),
  ('Art Deco'),
  ('Minimalist');

INSERT INTO target_audiences (name) VALUES
  ('Female'),
  ('Male'),
  ('Children'),
  ('Unisex');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_jewelry_updated_at
  BEFORE UPDATE ON jewelry
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_stones_updated_at
  BEFORE UPDATE ON stones
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();