const SUPABASE_URL = "https://udqlirsbugiflnrpfkdl.supabase.co";
const SUPABASE_PUBLIC_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWxpcnNidWdpZmxucnBma2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjg2NTcsImV4cCI6MjA1Mzg0NDY1N30.-LGuCvBEmV1w5YGTJb546wHW4wpQrJCHw4feiiur-HI";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

export async function saveToSupabase(venue) {
    try {
        const { data, error } = await sb
            .from("venues")
            .insert([venue])
            .select();
        if (error) {
            throw error;
        }
        console.log("Venue saved:", data);
        // alert and reset form
        alert("Form submitted successfully!");
        // form.reset();
    } catch (error) {
        console.error("Error saving venue:", error);
        alert("Failed to submit form. Please try again.");
    }
}

export async function getSurveyors() {
    const { data, error } = await sb
        .from("surveyors")
        .select("id, firstName, lastName");
    if (error) {
        throw error;
    }
    return data;
}
