import { saveToSupabase, getSurveyors } from "./supabase.js";
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
    const venueOpeningDays = formData.get("venueOpeningDays"); // todo: how do i get the value for this checkbox?
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
    const surveyorId = formData.get("surveyor");
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
        // photos:
        // surveyor info
        surveyorId,
        surveyDate,
        surveyNotes,
    };

    // Log the venue object (replace with API call later)
    console.log("Venue Data:", venue);

    await saveToSupabase(venue);
}

function setupEventListeners() {
    // Attach form submission handler
    const form = document.getElementById("venueForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (validatePage7()) {
            await submitForm(e);
        }
    });

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
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const surveyorSelect = document.getElementById("surveyor");
            const surveyors = await getSurveyors();

            surveyors.forEach((surveyor) => {
                const option = document.createElement("option");
                option.value = surveyor.id;
                option.textContent = [surveyor.firstName, surveyor.lastName]
                    .filter(Boolean)
                    .join(" ");
                surveyorSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error loading surveyors:", error);
        }
    });
}

setupEventListeners();
