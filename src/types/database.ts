export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface Finish {
  id: string;
  name: string;
  created_at: string;
}
export interface Designer {
  id: string;
  name: string;
  created_at: string;
}

export interface TargetAudience {
  id: string;
  name: string;
  created_at: string;
}

export interface Jewelry {
  id: string;
  reference_name: string;
  category_id: string;
  weight?: number;
  finish_id?: string;
  size?: string;
  designer_id?: string;
  target_audience_id?: string;
  observations?: string;
  client_name?: string;
  width?: number;
  height?: number;
  length?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Stone {
  id: string;
  jewelry_id: string;
  stone_type: string;
  cut: 'Round' | 'Square' | 'Oval' | 'Pear' | 'Marquise' | 'Emerald' | 'Princess' | 'Cushion' | 'Other';
  quantity: number;
  quality?: string;
  carats?: number;
  width?: number;
  height?: number;
  length?: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}