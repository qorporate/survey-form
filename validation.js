// page validation functions
// todo: can we get elements with `required` attribute from the DOM?
export function validatePage1() {
    const fields = {
        name: document.getElementById("name").value.trim(),
        address: document.getElementById("address").value.trim(),
        longitude: document.getElementById("longitude").value,
        latitude: document.getElementById("latitude").value,
        venueType: document.getElementById("venueType").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
    };

    return alertMissingFields(getMissingFields(fields));
}

export function validatePage2() {
    const fields = {
        pitchDimensions: document
            .getElementById("pitchDimensions")
            .value.trim(),
        numberOfPitches: document.getElementById("numberOfPitches").value,
    };

    return alertMissingFields(getMissingFields(fields));
}

export function validatePage3() {
    const fields = {
        venueHourlyRate: document.getElementById("venueHourlyRate").value, // todo: how are numbers handled
    };

    return alertMissingFields(getMissingFields(fields));
}

export function validatePage4() {
    const fields = {
        venueOpeningTime: document.getElementById("venueOpeningTime").value,
        venueClosingTime: document.getElementById("venueClosingTime").value,
        checkedDays: document.querySelectorAll('input[name="days"]:checked'),
        venuePeakTimes: document.getElementById("venuePeakTimes").value.trim(),
        averageVisitorsPerSession: Number(
            document.getElementById("averageVisitorsPerSession").value
        ),
    };

    return alertMissingFields(getMissingFields(fields));
}

export function validatePage5() {
    return true;
}
export function validatePage6() {
    return true;
}

export function validatePage7() {
    const fields = {
        surveyorId: document.getElementById("surveyor").value,
        surveyDate: document.getElementById("surveyDate").value.trim(), // todo: how are dates handled?
    };

    return alertMissingFields(getMissingFields(fields));
}

function getMissingFields(fields) {
    return Object.entries(fields)
        .filter(([_, value]) => {
            // Handle different types of values
            if (typeof value === "number") {
                return isNaN(value) || value <= 0;
            }
            if (typeof value === "object" && value?.length !== undefined) {
                return value.length === 0;
            }
            if (typeof value === "string") {
                return value.trim() === "";
            }
            return !value; // catches null, undefined, empty strings
        })
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
