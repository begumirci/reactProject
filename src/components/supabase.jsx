import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://atvrxcecfzuczmbjrpyu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dnJ4Y2VjZnp1Y3ptYmpycHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMTA5OTksImV4cCI6MjAwOTU4Njk5OX0.UV9p54DLSGjcA6YM3mQWAbHiZMHXLUeW64o1RhbfXzw");

export default supabase

