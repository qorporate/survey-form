import {
    validatePage1,
    validatePage2,
    validatePage3,
    validatePage4,
    validatePage5,
    validatePage6,
    validatePage7,
} from "./validation.js";
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
        surveyorName,
        surveyDate,
        surveyNotes,
    };

    // Log the venue object (replace with API call later)
    console.log("Venue Data:", venue);

    try {
        // const { data, error } = await supabase
        //     .from("venues")
        //     .insert([venue])
        //     .select();
        // if (error) {
        //     throw error;
        // }
        // console.log("Venue saved:", data);
        // alert and reset form
        // alert("Form submitted successfully!");
        // form.reset();
    } catch (error) {
        console.error("Error saving venue:", error);
        alert("Failed to submit form. Please try again.");
    }
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
}

function getMissingFields(fields) {
    return Object.entries(fields)
        .filter(([_, value]) => value === "")
        .map(([key, _]) => ({
            id: key.replace(" ", ""),
            label: key.charAt(0).toUpperCase() + key.slice(1),
        }));
}

function highlightInvalidFields(missingFields) {
    // Remove existing highlights
    document.querySelectorAll(".invalid-field").forEach((field) => {
        field.classList.remove("invalid-field");
    });

    // Add highlights to missing fields
    missingFields.forEach((field) => {
        console.log("field", field);
        const element = document.getElementById(field.id);
        if (element) {
            element.classList.add("invalid-field");
        }
    });
}

function alertMissingFields(missingFields) {
    if (missingFields.length > 0) {
        alert("Please fill in the required fields.");
        highlightInvalidFields(missingFields);
        return false;
    }
    return true;
}

// page validation functions
// todo: can we get elements with `required` attribute from the DOM?
function validatePage1() {
    const fields = {
        name: document.getElementById("name").value.trim(),
        address: document.getElementById("address").value.trim(),
        venueType: document.getElementById("venueType").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
    };

    return alertMissingFields(getMissingFields(fields));
}

function validatePage2() {
    const fields = {
        pitchDimensions: document
            .getElementById("pitchDimensions")
            .value.trim(),
        numberOfPitches: document.getElementById("numberOfPitches").value,
    };

    return alertMissingFields(getMissingFields(fields));
}

function validatePage3() {
    const fields = {
        venueHourlyRate: document.getElementById("venueHourlyRate").value, // todo: how are numbers handled
    };

    return alertMissingFields(getMissingFields(fields));
}

// todo: for numeric or array values, i can highlight the fields by passing a value to alertMissingFields().
// input is of type - field: { id: string }
function validatePage4() {
    const fields = {
        venueOpeningTime: document
            .getElementById("venueOpeningTime")
            .value.trim(), // todo: how is time handled
        venueClosingTime: document
            .getElementById("venueClosingTime")
            .value.trim(), // todo: how is time handled
        checkedDays: document.querySelectorAll('input[name="days"]:checked')
            .length, // todo: how do we highlight this section?
        venuePeakTimes: document.getElementById("venuePeakTimes").value.trim(),
        averageVisitorsPerSession: document.getElementById(
            "averageVisitorsPerSession"
        ).value,
    };

    return alertMissingFields(getMissingFields(fields));
}

function validatePage5() {
    return true;
}
function validatePage6() {
    return true;
}

function validatePage7() {
    const fields = {
        surveyorName: document.getElementById("surveyorName").value.trim(),
        surveyDate: document.getElementById("surveyDate").value.trim(), // todo: how are dates handled?
    };

    return alertMissingFields(getMissingFields(fields));
}

setupEventListeners();

// Initialize Supabase
const SUPABASE_URL = "https://udqlirsbugiflnrpfkdl.supabase.co";
const SUPABASE_PUBLIC_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWxpcnNidWdpZmxucnBma2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjg2NTcsImV4cCI6MjA1Mzg0NDY1N30.-LGuCvBEmV1w5YGTJb546wHW4wpQrJCHw4feiiur-HI";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
