import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mijzqoffemzfuxxvwgpd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1panpxb2ZmZW16ZnV4eHZ3Z3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NDMwMTksImV4cCI6MjAzMzQxOTAxOX0.bRe2QK_UdbH7BoeUsngTfAdgR-418iph6j5Q8Hqjc3M";
export const supabase = createClient(supabaseUrl, supabaseKey);
