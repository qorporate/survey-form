import {
    saveToSupabase,
    getSurveyors,
    isAuthenticated,
    uploadPhoto,
    getUser,
} from "./supabase.js";
import {
    validatePage1,
    validatePage2,
    validatePage3,
    validatePage4,
    validatePage5,
    validatePage6,
    validatePage7,
} from "./validation.js";
import { yesAndNoToBoolean } from "./util.js";

// updated in the photo upload event handler
let uploadedPhotos = [];

async function checkAuth() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        window.location.href = "auth.html";
    }
}

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
    const longitude = formData.get("longitude") || 3.325952;
    const latitude = formData.get("latitude") || 6.556877; // todo: set long & lat
    const venueType = formData.get("venueType");
    const contactPhoneNumber = formData.get("phoneNumber");
    const contactEmailAddress = formData.get("email");

    // pitch attributes
    const pitchType = formData.get("pitchType");
    const pitchCondition = formData.get("pitchCondition");
    const pitchDimensions = formData.get("pitchDimensions");
    const noOfPitchesInVenue = formData.get("numberOfPitches");
    const gameSizes = formData.get("gameSize");

    const isLightingAvailable = yesAndNoToBoolean(
        formData.get("isLightingAvailable")
    );

    const pitchFencingLevel = formData.get("pitchFencing");
    const pitchEvenness = formData.get("pitchEvenness");

    // access & logistics
    const venueOwnership = formData.get("venueOwnership");
    const publicOrPrivate = formData.get("publicOrPrivate");
    const costToPlay = formData.get("costToPlay");
    const venueHourlyRate = formData.get("venueHourlyRate");

    const isFirstAidKitAvailable = yesAndNoToBoolean(
        formData.get("isFirstAidKitAvailable")
    );

    const floodRiskLevel = formData.get("floodRiskLevel");
    const surveyorCrimeAssessment = formData.get("surveyorCrimeAssessment");

    // timing
    const venueClosingTime = formData.get("venueClosingTime");
    const venueOpeningTime = formData.get("venueOpeningTime");
    const venueOpeningDays = formData.get("venueOpeningDays") || ["Monday"]; // todo: how do i get the value for this checkbox?
    const venuePeakTimes = formData.get("venuePeakTimes");
    const averageVisitorsPerSession = formData.get("averageVisitorsPerSession");

    // amenities
    const hasChangingFacilities = yesAndNoToBoolean(
        formData.get("hasChangingFacilities")
    );
    const hasRestrooms = yesAndNoToBoolean(formData.get("hasRestrooms"));
    const parkingAvailability = formData.get("parkingAvailability");

    const hasFoodOrDrinkVendors = yesAndNoToBoolean(
        formData.get("hasFoodOrDrinkVendors")
    );
    const hasEquipmentRental = yesAndNoToBoolean(
        formData.get("hasEquipmentRental")
    );
    const hasSeatingOrSpectatorArea = yesAndNoToBoolean(
        formData.get("hasSeatingOrSpectatorArea")
    );

    // todo: Upload photos
    // const photoUrls = await photoUpload(photos);

    // surveyor info
    const userId = formData.get("userId");
    const surveyDate = formData.get("surveyDate");
    const surveyNotes = formData.get("surveyNotes");

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
        // access & logistics
        venueOwnership,
        publicOrPrivate,
        costToPlay,
        venueHourlyRate,
        isFirstAidKitAvailable,
        floodRiskLevel,
        surveyorCrimeAssessment,
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
        photoUrls: uploadedPhotos, // todo: get photos
        // surveyor info
        userId,
        surveyDate,
        surveyNotes,
    };

    // Log the venue object (replace with API call later)
    console.log("Venue Data:", venue);

    await saveToSupabase(venue);
}

async function setupEventListeners() {
    checkAuth().catch((error) => {
        console.error(error);
    });

    // Attach form submission handler
    const form = document.getElementById("venueForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (validatePage7()) {
            await submitForm(e);
        }
    });

    // events for page navigation
    document.addEventListener("DOMContentLoaded", () => {
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

                currentPage = pageNumber;
            }
        }

        const validationFunctions = [
            validatePage1,
            validatePage2,
            validatePage3,
            validatePage4,
            validatePage5,
            validatePage6,
            validatePage7,
        ];

        // Event listeners for navigation
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                navigateToPage(currentPage - 1);
            }
        });

        nextBtn.addEventListener("click", () => {
            navigateToPage(currentPage + 1);
        });

        // Function to navigate to a specific page
        function navigateToPage(targetPage) {
            // Validate all pages up to the target page
            for (let i = currentPage - 1; i < targetPage - 1; i++) {
                if (!validationFunctions[i]()) {
                    return false;
                }
            }

            showPage(targetPage);
            return true;
        }

        // Add click event listeners to progress bar steps
        steps.forEach((step) => {
            step.addEventListener("click", () => {
                const targetPage = Number.parseInt(step.dataset.step);
                if (targetPage <= currentPage || navigateToPage(targetPage)) {
                    showPage(targetPage);
                }
            });
        });

        // Initialize the form
        showPage(1);
    });

    // Add input event listeners to remove highlights when fields are filled
    document.querySelectorAll("input, select").forEach((field) => {
        field.addEventListener("input", () => {
            field.classList.remove("invalid-field");
        });
    });

    // populate surveyor field
    // todo: get surveyor on auth
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const user = await getUser();
            if (!user) {
                throw new Error("User not authenticated!");
            }

            console.log(user);

            // Set surveyor name and ID
            const surveyorSelect = document.getElementById("surveyor");
            const userId = document.getElementById("userId");

            surveyorSelect.value = user.email; // Display email in readonly field
            userId.value = user.id; // Set ID in hidden field
        } catch (error) {
            console.error("Error loading surveyors:", error);
        }
    });

    // photo upload handling
    const photoPreviewContainer = document.getElementById(
        "photo-preview-container"
    );
    const photoInput = document.getElementById("photos");
    photoInput.addEventListener("change", async (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const publicURL = await uploadPhoto(file);

                uploadedPhotos.push(publicURL);
                displayPhotoPreview(publicURL);
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Failed to upload file. Please try again.");
            }
        }
    });

    function displayPhotoPreview(url) {
        const previewElement = document.createElement("div");

        previewElement.className = "photo-preview";
        previewElement.innerHTML = `
        <img src="${url}" alt="Uploaded venue photo">
        <button class="remove-photo" data-url="${url}">&times;</button>
    `;
        photoPreviewContainer.appendChild(previewElement);

        previewElement
            .querySelector(".remove-photo")
            .addEventListener("click", function () {
                const urlToRemove = this.getAttribute("data-url");
                uploadedPhotos = uploadedPhotos.filter(
                    (url) => url !== urlToRemove
                );
                photoPreviewContainer.removeChild(previewElement);
            });
    }
}

setupEventListeners().catch((error) => {
    console.error(error);
});
