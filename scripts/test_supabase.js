const { createClient } = require("@supabase/supabase-js");

require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, error } = await supabase
    .from("gare")
    .select("cig, ente_appaltante, oggetto")
    .limit(1);

  if (error) {
    console.log("ERRORE:", error.message);
    return;
  }

  console.log("OK SUPABASE");
  console.log(data);
}

run();