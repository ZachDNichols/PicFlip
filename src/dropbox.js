const dropbox = document.getElementById("dropbox");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const uploadedFiles = [];
const errorText = document.getElementById("errorText");

// Handle drag and drop
dropbox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropbox.classList.add("dragover");
});

dropbox.addEventListener("dragleave", () => {
    dropbox.classList.remove("dragover");
});

dropbox.addEventListener("drop", (e) => {
    errorText.style.display = "none";
    e.preventDefault();
    dropbox.classList.remove("dragover");
    addFiles(e.dataTransfer.files);
});

// Handle click to upload
dropbox.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = "image/*"; // Only allow images
    fileInput.onchange = () => addFiles(fileInput.files);
    fileInput.click();
});

// Add files to the global array and update the list
function addFiles(files) {
    var newFileAdded = false;

    for (const file of files) {
        if (!uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
            uploadedFiles.push(file);
            createThumbnail(file);
        }
        else{
            errorText.innerHTML = "File already uploaded";
            errorText.style.display = "block";
        }
    }
    if (newFileAdded){
        displayFiles();
    }
}

function createThumbnail(file) {
    const reader = new FileReader();

    reader.onload = () => {
        const thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";

        const img = document.createElement("img");
        img.src = reader.result;
        thumbnail.appendChild(img);

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", () => removeFile(file, thumbnail));
        thumbnail.appendChild(removeBtn);

        thumbnailContainer.appendChild(thumbnail);
    };

    reader.readAsDataURL(file);
}

function removeFile(file, thumbnail) {
    const index = uploadedFiles.findIndex(f => f.name === file.name && f.size === file.size);
    if (index > -1) {
        uploadedFiles.splice(index, 1); // Remove file from array
        thumbnail.remove(); // Remove thumbnail from UI
    }
}