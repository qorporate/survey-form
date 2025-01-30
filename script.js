// Placeholder function for form submission
async function submitForm(event) {
    event.preventDefault();

    // Get form data
    const form = event.target;
    const formData = new FormData(form);

    // Extract values
    const name = formData.get("name");
    const description = formData.get("description");
    const address = formData.get("address");
    const coordinates = formData.get("coordinates");
    const surfaceType = formData.get("surfaceType");
    const gameSize = formData.get("gameSize");
    const surveyorName = formData.get("surveyorName");
    const photos = formData.getAll("photos");

    // Upload photos
    const photoUrls = await photoUpload(photos);

    // Create venue object
    const venue = {
        name,
        description,
        address,
        coordinates,
        surfaceType,
        gameSize,
        surveyorName,
        photos: photoUrls,
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
