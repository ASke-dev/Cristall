import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hoouzbqbbytojbupofkb.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvb3V6YnFiYnl0b2pidXBvZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDA2MzAsImV4cCI6MjA3NDkxNjYzMH0.2wqJbaNXWgsFVMnDMMMMO8_dQvr5RH217gOR2tQTryE'; 

export const supabase = createClient(supabaseUrl, supabaseKey);