// Placeholder function for form submission
async function submitForm(event) {
    event.preventDefault();

    // Get form data
    const form = event.target;
    const formData = new FormData(form);

    // Extract values
    // core information
    const venueName = formData.get("name");
    const description = formData.get("description");
    const addressText = formData.get("address");
    const longitude = formData.get("longitude");
    const latitude = formData.get("latitude");
    const venueType = formData.get("venueType");
    const contactPhoneNumber = formData.get("phoneNumber");
    const contactEmailAddress = formData.get("email");

    // pitch attributes
    const pitchType = formData.get("pitchType");
    const pitchCondition = formData.get("pitchCondition");
    const pitchDimensions = formData.get("pitchDimensions");
    const noOfPitchesInVenue = formData.get("numberOfPitches");
    const gameSizes = formData.get("gameSize");
    const isLightingAvailable = formData.get("isLightingAvailable"); // todo: convert yes/no to boolean
    const pitchFencingLevel = formData.get("pitchFencing");
    const pitchEvenness = formData.get("pitchEvenness");

    // access & logistics
    const venueOwnership = formData.get("venueOwnership");
    const publicOrPrivate = formData.get("publicOrPrivate");
    const costToPlay = formData.get("costToPlay");
    const venueHourlyRate = formData.get("venueHourlyRate");
    const isFirstAidKitAvailable = formData.get("isFirstAidKitAvailable"); // todo: convert yes/no to boolean
    const floodRiskLevel = formData.get("floodRiskLevel");
    const surveyorCrimeAssessment = formData.get("surveyorCrimeAssessment");

    // timing
    const venueClosingTime = formData.get("venueClosingTime");
    const venueOpeningTime = formData.get("venueOpeningTime");
    const venueOpeningDays = formData.get("venueOpeningDays"); // todo: how do i get the value for this checkbox?
    const venuePeakTimes = formData.get("venuePeakTimes");
    const averageVisitorsPerSession = formData.get("averageVisitorsPerSession");

    // amenities
    const hasChangingFacilities = formData.get("hasChangingFacilities"); // todo: convert yes/no to boolean
    const hasRestrooms = formData.get("hasRestrooms"); // todo: convert yes/no to boolean
    const parkingAvailability = formData.get("parkingAvailability");
    const hasFoodOrDrinkVendors = formData.get("hasFoodOrDrinkVendors"); // todo: convert yes/no to boolean
    const hasEquipmentRental = formData.get("hasEquipmentRental"); // todo: convert yes/no to boolean
    const hasSeatingOrSpectatorArea = formData.get("hasSeatingOrSpectatorArea"); // todo: convert yes/no to boolean

    // todo: Upload photos
    // const photoUrls = await photoUpload(photos);

    // surveyor info
    const surveyorName = formData.get("surveyorName"); // todo: convert yes/no to boolean
    const surveyDate = formData.get("surveyDate"); // todo: convert yes/no to boolean
    const surveyNotes = formData.get("surveyNotes"); // todo: convert yes/no to boolean

    // Create venue object
    const venue = {
        venueName,
        description,
        addressText,
        longitude,
        latitude,
        venueType,
        contactPhoneNumber,
        contactEmailAddress,
        // pitch attr
        pitchType,
        pitchCondition,
        pitchDimensions,
        noOfPitchesInVenue,
        gameSizes,
        isLightingAvailable,
        pitchFencingLevel,
        pitchEvenness,
        // timing
        venueClosingTime,
        venueOpeningTime,
        venueOpeningDays,
        venuePeakTimes,
        averageVisitorsPerSession,
        // amenities
        hasChangingFacilities,
        hasRestrooms,
        parkingAvailability,
        hasFoodOrDrinkVendors,
        hasEquipmentRental,
        hasSeatingOrSpectatorArea,
        // photos
        // photos:
        // surveyor info
        surveyorName,
        surveyDate,
        surveyNotes,
    };

    // Log the venue object (replace with API call later)
    console.log("Venue Data:", venue);

    // Reset form
    form.reset();
    alert("Form submitted successfully!");
}

function setupEventListeners() {
    // Attach form submission handler
    const form = document.getElementById("venueForm");
    form.addEventListener("submit", submitForm);

    // event listener for photo uploads
    // adds fileNames below button to show items have been uploaded
    document.addEventListener("DOMContentLoaded", () => {
        const fileInput = document.getElementById("photos");
        const fileNames = document.getElementById("file-names");

        fileInput.addEventListener("change", function () {
            fileNames.innerHTML = "";
            for (let i = 0; i < this.files.length; i++) {
                const fileName = document.createElement("p");
                fileName.textContent = this.files[i].name;
                fileNames.appendChild(fileName);
            }
        });
    });

    // events for page navigation
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("venueForm");
        const pages = document.querySelectorAll(".form-page");
        const steps = document.querySelectorAll(".step");
        const prevBtn = document.querySelector(".btn-prev");
        const nextBtn = document.querySelector(".btn-next");
        const submitBtn = document.querySelector(".btn-submit");
        let currentPage = 1;

        // Navigation functions
        function showPage(pageNumber) {
            pages.forEach((page) => {
                page.classList.remove("active");
                if (Number.parseInt(page.dataset.page) === pageNumber) {
                    page.classList.add("active");
                }
            });

            steps.forEach((step) => {
                const stepNumber = Number.parseInt(step.dataset.step);
                step.classList.remove("active");
                if (stepNumber === pageNumber) {
                    step.classList.add("active");
                } else if (stepNumber < pageNumber) {
                    step.classList.add("completed");
                } else {
                    step.classList.remove("completed");
                }
            });

            // Update button states
            prevBtn.disabled = pageNumber === 1;
            if (pageNumber === pages.length) {
                nextBtn.style.display = "none";
                submitBtn.style.display = "block";
            } else {
                nextBtn.style.display = "block";
                submitBtn.style.display = "none";
            }
        }

        // Event listeners for navigation
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentPage < pages.length) {
                currentPage++;
                showPage(currentPage);
            }
        });
    });
}

setupEventListeners();

// Initialize Supabase
const SUPABASE_URL = "https://udqlirsbugiflnrpfkdl.supabase.co";
const SUPABASE_PUBLIC_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWxpcnNidWdpZmxucnBma2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjg2NTcsImV4cCI6MjA1Mzg0NDY1N30.-LGuCvBEmV1w5YGTJb546wHW4wpQrJCHw4feiiur-HI";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
