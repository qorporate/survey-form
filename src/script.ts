// Placeholder function for photo upload
function photoUpload(files: FileList): Promise<string[]> {
    return new Promise((resolve) => {
        console.log("Uploading photos...");
        // todo: use cloudinary
        // Simulate photo upload delay
        setTimeout(() => {
            const photoUrls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            resolve(photoUrls);
        }, 2000);
    });
}

// Placeholder function for form submission
async function submitForm(event: Event) {
    event.preventDefault();

    // Get form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Extract values
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const coordinates = formData.get("coordinates") as string;
    const surfaceType = formData.get("surfaceType") as string;
    const gameSize = formData.get("gameSize") as string;
    const surveyorName = formData.get("surveyorName") as string;
    const photos = formData.getAll("photos") as File[];

    // Upload photos
    const photoUrls = await photoUpload(photos as unknown as FileList);

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

// Attach form submission handler
const form = document.getElementById("venueForm") as HTMLFormElement;
form.addEventListener("submit", submitForm);
