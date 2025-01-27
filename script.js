// src/script.ts
function photoUpload(files) {
  return new Promise((resolve) => {
    console.log("Uploading photos...");
    setTimeout(() => {
      const photoUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      resolve(photoUrls);
    }, 2000);
  });
}
async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get("name");
  const description = formData.get("description");
  const address = formData.get("address");
  const coordinates = formData.get("coordinates");
  const surfaceType = formData.get("surfaceType");
  const gameSize = formData.get("gameSize");
  const surveyorName = formData.get("surveyorName");
  const photos = formData.getAll("photos");
  const photoUrls = await photoUpload(photos);
  const venue = {
    name,
    description,
    address,
    coordinates,
    surfaceType,
    gameSize,
    surveyorName,
    photos: photoUrls
  };
  console.log("Venue Data:", venue);
  form.reset();
  alert("Form submitted successfully!");
}
var form = document.getElementById("venueForm");
form.addEventListener("submit", submitForm);
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("photos");
  const fileNames = document.getElementById("file-names");
  fileInput.addEventListener("change", function() {
    fileNames.innerHTML = "";
    for (let i = 0;i < this.files.length; i++) {
      const fileName = document.createElement("p");
      fileName.textContent = this.files[i].name;
      fileNames.appendChild(fileName);
    }
  });
});
