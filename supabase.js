const SUPABASE_URL = "https://udqlirsbugiflnrpfkdl.supabase.co";
const SUPABASE_PUBLIC_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWxpcnNidWdpZmxucnBma2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjg2NTcsImV4cCI6MjA1Mzg0NDY1N30.-LGuCvBEmV1w5YGTJb546wHW4wpQrJCHw4feiiur-HI";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

export async function saveToSupabase(venue) {
    try {
        const { error } = await sb.from("venues").insert(venue);
        if (error) {
            throw error;
        }

        console.log("Venue saved:");
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

export async function verifyOtp(email, token) {
    const { error } = await sb.auth.verifyOtp({
        email,
        token,
        type: "email",
    });

    if (error) {
        alert("Error verifying OTP: " + error.message);
    } else {
        alert("Authentication successful!");
        window.location.href = "index.html";
    }
}

export async function isAuthenticated() {
    const {
        data: { user },
    } = await sb.auth.getUser();
    return !!user;
}

export async function getUser() {
    const { data } = await sb.auth.getSession();
    return data.session.user;
}

export async function signInWithOtp(email) {
    return await sb.auth.signInWithOtp({ email });
}

export async function uploadPhoto(file) {
    const { data, error } = await sb.storage
        .from("venue-photos")
        .upload(`${Date.now()}_${file.name}`, file);
    console.log(data);

    if (error) {
        throw error;
    }

    const res = sb.storage.from("venue-photos").getPublicUrl(data.path);
    console.log(res);

    if (!res) {
        throw new Error("Failed to get image.");
    }

    return res.data.publicUrl;
}
