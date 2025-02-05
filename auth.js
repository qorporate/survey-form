import { verifyOtp, signInWithOtp, isAuthenticated } from "./supabase.js";

document.addEventListener("DOMContentLoaded", async () => {
    await checkAuth();

    const authForm = document.getElementById("auth-form");
    const otpForm = document.getElementById("otp-form");
    const sendOtpBtn = document.getElementById("send-otp-btn");
    const verifyOtpBtn = document.getElementById("verify-otp-btn");
    const resendOtpBtn = document.getElementById("resend-otp-btn");
    const emailInput = document.getElementById("email");
    const otpInput = document.getElementById("otp");

    sendOtpBtn.addEventListener("click", async () => {
        const email = emailInput.value;
        await sendOTP(email);
    });

    verifyOtpBtn.addEventListener("click", async () => {
        const email = emailInput.value;
        const token = otpInput.value;

        await verifyOtp(email, token);
    });

    // countdown for resend otp button
    let countdownInterval;
    function startCountdown() {
        let seconds = 65; // ! if you change this, update auth.html too!
        resendOtpBtn.disabled = true;
        countdownInterval = setInterval(() => {
            seconds--;
            resendOtpBtn.textContent = `Resend OTP (${seconds}s)`;
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                resendOtpBtn.textContent = "Resend OTP";
                resendOtpBtn.disabled = false;
            }
        }, 1000);
    }

    async function sendOTP(email) {
        const { error } = await signInWithOtp(email);

        if (error) {
            alert("Error sending OTP: " + error.message);
        } else {
            authForm.classList.add("hidden");
            otpForm.classList.remove("hidden");
            alert("OTP sent to your email. Please check your inbox.");
            startCountdown();
        }
    }

    resendOtpBtn.addEventListener("click", async () => {
        const email = emailInput.value;
        clearInterval(countdownInterval);
        await sendOTP(email);
    });

    // add event to check if already authenticated, and redirect to survey page
});

async function checkAuth() {
    const authenticated = await isAuthenticated();
    if (authenticated) {
        window.location.href = "index.html";
    }
}
