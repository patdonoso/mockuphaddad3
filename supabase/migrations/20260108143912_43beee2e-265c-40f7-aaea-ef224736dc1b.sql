-- Add technical sheet column to products table
ALTER TABLE public.products 
ADD COLUMN technical_sheet_url text;