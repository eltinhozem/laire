import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://aws-0-us-east-1.pooler.supabase.com';
const SUPABASE_SERVICE_ROLE_KEY = 'f4mXtgSypKKiRBRW'; // 🔴 Esta chave deve ser mantida segura!

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
