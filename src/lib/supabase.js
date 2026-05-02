import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfjuiylnobdzfevolxin.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5manVpeWxub2JkemZldm9seGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDgyNjgsImV4cCI6MjA5MzMyNDI2OH0.yHJqSoE0_Acjv_zrTxCRoDtg72U-mnPoxHbLPb5C2cs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
