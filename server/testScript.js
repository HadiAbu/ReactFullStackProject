// testSupabase.js
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function test() {
  const { data, error } = await supabase.from("POST").select("*");
  if (error) console.error("Error:", error);
  else console.log("Posts:", data);
}

test();
