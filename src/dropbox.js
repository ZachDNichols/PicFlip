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
    for (const file of files) {
        if (!uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
            uploadedFiles.push(file);

            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = reader.result;
                const fileName = file.name;

                window.electronApi.sendFileContent(fileName, fileContent);
                console.log("File path sent to main:", file);
            }

            reader.readAsDataURL(file);
        }
        else{
            errorText.innerHTML = "File already uploaded";
            errorText.style.display = "block";
        }
    }
}