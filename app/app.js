document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);
  const dropArea = document.querySelector(".border-dashed");
  const thumbnails = document.getElementById("thumbnails");
  const selectFilesBtn = document.getElementById("selectFilesBtn");
  const addMoreBtn = document.getElementById("addMoreBtn");
  const compressionSettings = document.querySelector(".compression-settings");
  const toggleOptionsBtn = document.getElementById("toggleOptions");
  const additionalOptions = document.querySelector(".additional-options");
  const qualitySelect = document.getElementById("quality");
  let formatSelect = document.getElementById("format");
  const resizeCheckbox = document.getElementById("resize");
  const sizeCheckbox = document.getElementById("size");
  const widthInput = document.querySelector('input[placeholder="Width"]');
  const heightInput = document.querySelector('input[placeholder="Height"]');
  const sizeInput = document.querySelector('input[placeholder="Size"]');
  const sizeUnit = document.getElementById("size-unit");
  let sizeUnitValue = sizeUnit.value;

  const resultsContainer = document.createElement("div");
  const metadata = document.getElementById("metadata");

  resultsContainer.className = "mt-8";
  document.querySelector("main").appendChild(resultsContainer);
  compressionSettings.style.display = "none";

  let totalSaved = "0 MB";
  let fileSizeSaved;
  const downloadLinks = [];
  let responsesReceived = 0;
  const allFiles = []; // Array to store all selected files
  const compressedFiles = new Map(); // Map to track compressed files and their sizes

  function formatSize(sizeInBytes) {
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInKB / 1024;
    return sizeInMB >= 1
      ? `${sizeInMB.toFixed(2)} MB`
      : `${sizeInKB.toFixed(2)} KB`;
  }

  selectFilesBtn.addEventListener("click", () => {
    fileInput.click();
  });

  addMoreBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => handleFiles(e.target.files));
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("bg-blue-100");
  });
  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("bg-blue-100");
  });
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("bg-blue-100");
    handleFiles(e.dataTransfer.files);
  });

  toggleOptionsBtn.addEventListener("click", () => {
    if (additionalOptions.style.display === "none") {
      additionalOptions.style.display = "block";
      toggleOptionsBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 toggle-icon rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg> Hide Additional Options';
      qualitySelect.value = "Additional Option";
    } else {
      additionalOptions.style.display = "none";
      toggleOptionsBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg> Show Additional Options';
    }
  });

  function displayValidationError(inputElement, message) {
    // Add a red border to indicate an error
    inputElement.style.borderColor = "red";

    // Create an error message element
    const errorElement = document.createElement("div");
    errorElement.className = "validation-error"; // Assign a class for easy removal
    errorElement.style.color = "red";
    errorElement.style.fontSize = "12px";
    errorElement.textContent = message;

    // Insert the error message immediately after the input element
    inputElement.parentNode.insertBefore(
      errorElement,
      inputElement.nextSibling
    );
  }

  // Function to clear all existing validation errors
  function clearValidationErrors() {
    // Reset border colors for all dimension inputs
    document.querySelectorAll(".dimension-input").forEach((input) => {
      input.style.borderColor = ""; // Remove error border
    });

    document.querySelectorAll(".size-input").forEach((input) => {
      input.style.borderColor = ""; // Remove error border
    });

    // Remove all current validation error messages
    const errors = document.querySelectorAll(".validation-error");
    errors.forEach((error) => error.remove());
  }

  // Validate input values for dimension inputs
  function validateInput() {
    let isValid = true;
    clearValidationErrors(); // Remove previous error indicators

    document.querySelectorAll(".dimension-input").forEach((input) => {
      const value = parseInt(input.value, 10);
      if ((isNaN(value) || value < 1) && resizeCheckbox.checked) {
        isValid = false;
        displayValidationError(
          input,
          `${input.placeholder} must be at least 1 pixels.`
        );
      }
    });

    // document.querySelectorAll('.size-input').forEach(input => {
    //   const value = parseFloat(input.value, 10);
    //   if ((isNaN(value) || value < 100) && sizeCheckbox.checked && sizeUnit.value === 'KB') {
    //     isValid = false;
    //     displayValidationError(input, `${input.placeholder} must be at least 100 KB.`);
    //   }
    //   else if((isNaN(value) || value < 0.1) && sizeCheckbox.checked && sizeUnit.value === 'MB'){
    //     isValid = false;
    //     displayValidationError(input, `${input.placeholder} must be at least 0.1 MB.`);
    //   }
    // });

    return isValid;
  }

  formatSelect.addEventListener("change", () => {
    resetCompressionState(); // Enable recompression on formatchange
  });

  metadata.addEventListener("change", () => {
    resetCompressionState(); // Enable recompression on formatchange
  });

  sizeUnit.addEventListener("change", () => {
    resetCompressionState(); // Enable recompression on formatchange
  });

  qualitySelect.addEventListener("change", () => {
    resetCompressionState(); // Enable recompression on quality change
    if (qualitySelect.value === "Additional Option") {
      additionalOptions.style.display = "block";
      toggleOptionsBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 toggle-icon rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg> Hide Additional Options';
    } else {
      additionalOptions.style.display = "none";
      toggleOptionsBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg> Show Additional Options';
    }
  });

  resizeCheckbox.addEventListener("change", () => {
    if (resizeCheckbox.checked) {
      sizeCheckbox.checked = false;
      widthInput.value = "";
      heightInput.value = "";
      sizeInput.value = "";
    } else {
      sizeCheckbox.checked = true;
      widthInput.value = "";
      heightInput.value = "";
    }
    resetCompressionState();
  });

  sizeCheckbox.addEventListener("change", () => {
    if (sizeCheckbox.checked) {
      resizeCheckbox.checked = false;
      widthInput.value = "";
      heightInput.value = "";
      sizeInput.value = "";
    } else {
      resizeCheckbox.checked = true;
    }
    resetCompressionState();
  });

  widthInput.addEventListener("input", () => {
    if (widthInput.value || heightInput.value) {
      resizeCheckbox.checked = true;
      sizeCheckbox.checked = false;
      sizeInput.value = "";
    }
    resetCompressionState();
  });

  heightInput.addEventListener("input", () => {
    if (widthInput.value || heightInput.value) {
      resizeCheckbox.checked = true;
      sizeCheckbox.checked = false;
      sizeInput.value = "";
    }
  });

  sizeInput.addEventListener("input", () => {
    if (sizeInput.value) {
      sizeCheckbox.checked = true;
      resizeCheckbox.checked = false;
      widthInput.value = "";
      heightInput.value = "";
    }
    resetCompressionState();
  });

  //
  dropArea.addEventListener("paste", (event) => {
    // Access clipboard data from the paste event
    const clipboardItems = event.clipboardData.items;

    // Iterate over clipboard items to find image files
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];

      // Check if the item is an image
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile(); // Get the file object from clipboard item
        handleFiles([file]); // Pass the image file to the handleFiles function
        break; // Stop after the first image
      }
    }
  });

  function handleFiles(files) {
    let totalSize = allFiles.reduce((acc, file) => acc + file.size, 0);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 50 * 1024 * 1024) {
        alert("File size limit exceeded 50 MB");
        continue;
      }
      if (
        !allFiles.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        )
      ) {
        allFiles.push(file); // Add file to allFiles array if not already present
        totalSize += file.size;
        if (totalSize > 250 * 1024 * 1024) {
          alert("Total file size limit exceeded 250 MB");
          allFiles.pop(); // Remove the last added file to keep total size under limit
          break;
        }

        const objectURL = URL.createObjectURL(file);
        const img = document.createElement("img");
        const heicTypeArr = file.name.split(".");
        const isHeic = heicTypeArr[heicTypeArr.length - 1] === "heic";
        const isTiff = file.type.split("/")[1] === "tiff";
        const isSVG = file.type.split("/")[1] === "svg+xml";

        img.src = isHeic
          ? "image/jpegcompresor_heic.png"
          : isTiff
          ? "image/jpegcompressor_tiff.png"
          : objectURL;
        img.className = "h-16 w-16 object-cover rounded";
        img.dataset.filename = file.name;
        img.dataset.filesize = file.size;
        const mimeType = file.type.split("/");
        file.format = isHeic
          ? "heic"
          : isSVG
          ? "svg"
          : mimeType[mimeType.length - 1];
        const thumbnail = document.createElement("div");
        thumbnail.className = "relative inline-block group";
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "&times;";
        removeBtn.className =
          "absolute top-0 right-0 bg-gray-200 text-black mx-auto rounded-full w-5 h-5 flex items-center justify-center   opacity-100";
        removeBtn.onclick = () => {
          thumbnail.remove();
          URL.revokeObjectURL(objectURL);
          const index = allFiles.indexOf(file);
          if (index > -1) {
            allFiles.splice(index, 1); // Remove file from allFiles array
            compressedFiles.delete(file.name); // Remove from compressedFiles map
          }
        };
        thumbnails.appendChild(thumbnail);
        thumbnail.appendChild(img);
        thumbnail.appendChild(removeBtn);
      }
    }
    selectFilesBtn.classList.add("hidden");
    addMoreBtn.classList.remove("hidden");
    compressionSettings.style.display = "block";
  }

  document
    .querySelector(".bg-green-500")
    .addEventListener("click", async () => {
      if (!validateInput() && qualitySelect.value === "Additional Option") {
        console.log("validation failed");
        return; // Prevent further processing if validation fails
      } else {
        clearValidationErrors();
      }

      let compressButton = document.querySelector(".bg-green-500");

      // Change button's inner HTML to show loading spinner
      let originalButtonHTML = compressButton.innerHTML;
      compressButton.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
        <svg class="animate-spin" style="width: 20px; height: 20px; color: white;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 11-8 8z"></path>
        </svg>
        <div style="color: white; font-size: 12px; margin-left: 8px; text-align: center;">
          Compressing
        </div>
      </div>`;
      setTimeout(function () {
        compressButton.innerHTML = originalButtonHTML;
      }, 4000);

      resultsContainer.innerHTML = `<div class="flex flex-wrap justify-center mb-4">
      </div>
      <div class="flex flex-wrap   justify-between gap-1  items-center mb-4 p-2 sm:p-4 border rounded-lg bg-gray-50">
       <div class="text-sm sm:text-lg font-semibold">Total Saved: <span id="total-saved" class="text-green-600">0</span></div>
       <!-- Include Heroicons SVG -->
 

     <div class='flex gap-1 row-reverse justify-between w-full sm:w-auto'>
     <button id="clear-list" 
  class="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg shadow-md p-2 sm:p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xm sm:text-lg">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L12.586 12l-2.293-2.293a1 1 0 111.414-1.414L14 10.586l2.293-2.293a1 1 0 011.414 1.414L15.414 12l2.293 2.293a1 1 0 01-1.414 1.414L14 13.414l-2.293 2.293a1 1 0 01-1.414 0z" clip-rule="evenodd" />
  </svg>
  
</button>




     <button id="download-all" class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm  py-1 sm:py-2 px-2 sm:px-4 rounded text-xm sm:text-lg">Download All</button>
     </div>
      </div>
      `;

      let totalOriginalSize = 0;
      let totalCompressedSize = 0;

      responsesReceived = 0;
      thumbnails.querySelectorAll("img").forEach(async (img, index) => {
        const fileSection = document.createElement("div");
        fileSection.classList = "  rounded-lg shadow-md mb-2 download-btn";
        const originalSize =
          (img.dataset.filesize / (1024 * 1024)).toFixed(2) + " MB";
        const truncatedName =
          img.dataset.filename.length > 20
            ? img.dataset.filename.substring(0, 25) + "..."
            : img.dataset.filename;
        fileSection.innerHTML = `
            <div class='flex flex-col gap-1 sm:flex-row   justify-between p-1 sm:p-2'>
<!-- 1 -->
  <div class='flex'>

    <img src="${img.src}" alt="file image" class="w-12 h-12 mr-2 rounded">
    <div class="flex-1">
      <div class="text-xs sm:text-sm font-semibold">Name: ${truncatedName}</div>
      <div class="text-xs font-light">Format: </div>
      <div class="text-gray-600 text-xs">Before: &rarr; After: -- MB</div>
    </div>
  </div>

  <!-- 2 -->
  <div class='flex items-center justify-between '>
    <div class="mr-2 progress-bar" style="width: 100px;">
      <div class="progress-bar-inner" id="progress-bar-${index}" style="
width: 0;
background-size: 1rem 1rem;
animation: progress-bar-stripes 0.5s linear infinite;
transition: width 0.6s ease;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;
color: white;
font-weight: bold;
font-size: 10px;
">0%
</div>
    </div>
    <div class='flex '>
    <button
    class="compare-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1 text-xs">Compare</button>
    <button
    class="download-btn bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">Download</button>
    </div>
  </div>
</div>
            `;

        resultsContainer.appendChild(fileSection);
        const downloadButton = fileSection.querySelector(".download-btn"); // Get the specific button

        const actualFile = allFiles.find(
          (file) => file.name === img.dataset.filename
        ); // Use allFiles array
        let convertedFormat;

        if (formatSelect.value === "Original Format") {
          if (actualFile.type === "image/svg+xml") {
            convertedFormat = "svg";
          } else {
            convertedFormat = actualFile.format.toLowerCase();
          }
        } else {
          convertedFormat = formatSelect.value.toLowerCase();
        }
        if (!compressedFiles.has(actualFile.name)) {
          // Check if file is not already compressed
          totalOriginalSize += actualFile.size;
          const formData = new FormData();
          formData.append("file", actualFile);
          formData.append(
            "settings",
            JSON.stringify({
              quality: qualitySelect.value,
              width: widthInput.value,
              height: heightInput.value,
              keepMetadata: document.getElementById("metadata").checked,
              resizeCheckbox: resizeCheckbox.checked,
              targetSize: sizeInput.value,
              targetSizeUnit: document.querySelector(".targetSizeUnit")?.value,
              format: convertedFormat,
              targetSizeUnit: sizeUnit.value,
            })
          );

          try {
            // simulateProgress(`progress-bar-${index}`, 0);

            simulateProgress(`progress-bar-${index}`, downloadButton);

            const response = await fetch(
              "https://bc.jpegcompressor.com/api/compress",
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            const compressedSize = data.compressedSize;
            totalCompressedSize += compressedSize;
            downloadLinks[index] = data.downloadLink;

            fileSection.querySelector(".text-xs").innerHTML =
              actualFile.format === data.format
                ? `Format ${actualFile.format.toUpperCase()}`
                : `Format: ${actualFile.format.toUpperCase()}  -> ${data.format.toUpperCase()}`;
            fileSection.querySelector(
              ".text-gray-600"
            ).innerHTML = `Before: ${formatSize(
              actualFile.size
            )} &rarr; After: ${formatSize(compressedSize)}`;
            fileSection.querySelector(".download-btn").onclick = () => {
              window.location.href = data.downloadLink;
            };
            const fileSavedPercentage =
              ((actualFile.size - compressedSize) / actualFile.size) * 100;
            completeProgress(
              `progress-bar-${index}`,
              fileSavedPercentage,
              downloadButton
            );
            document.getElementById("total-saved").textContent = `${formatSize(
              totalCompressedSize
            )}/${formatSize(totalOriginalSize)}`;
            responsesReceived++;
            compressedFiles.set(actualFile.name, compressedSize); // Mark file as compressed with size
            if (
              responsesReceived === thumbnails.querySelectorAll("img").length
            ) {
              //           compressButton.innerHTML = `
              //           <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              //   <svg class="animate-spin" style="width: 20px; height: 20px; color: white;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              //     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
              //     <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 11-8 8z"></path>
              //   </svg>
              //   <div style="color: white; font-size: 12px; margin-left: 8px; text-align: center;">
              //         compress images
              //   </div>
              // </div>
              //         `;

              const downloadAllBtn = document.getElementById("download-all");
              downloadAllBtn.innerHTML = "Download All";
            }
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          // Update progress bar and after size for already compressed files

          const compressedSize = compressedFiles.get(actualFile.name);
          const savedPercentage =
            ((actualFile.size - compressedSize) / actualFile.size) * 100;
          const progressBar = document.getElementById(`progress-bar-${index}`);
          progressBar.style.width = "100%";
          progressBar.style.background = "#3bf64480";
          progressBar.textContent = `${savedPercentage.toFixed(2)}%`;
          fileSection.querySelector(".text-gray-600").innerHTML = `Format: ${
            actualFile.format
          } Before: ${formatSize(actualFile.size)} &rarr; After: ${formatSize(
            compressedSize
          )}`;
          fileSection.querySelector(".download-btn").onclick = () => {
            window.location.href = downloadLinks[index];
          };
        }
      });
      document.getElementById("download-all").addEventListener("click", () => {
        const downloadAllBtn = document.getElementById("download-all");
        downloadAllBtn.innerHTML = `
       <div style="display: flex; align-items: center; width: 120px; height: 20px;">
  <svg class="animate-spin" style="width: 20px; height: 20px; color: white;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 11-8 8z"></path>
  </svg>
  <div style="color: white; font-size: 12px; margin-left: 8px; text-align: center;">
    Generating Zip
  </div>
</div>
      `;
        setTimeout(() => {
          const fileNames = downloadLinks.map((link) =>
            link.substring(link.lastIndexOf("/") + 1)
          );
          fetch("https://bc.jpegcompressor.com/api/download-zip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ files: fileNames }),
          })
            .then((response) => response.blob())
            .then((blob) => {
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = "compressed_images.zip";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              downloadAllBtn.innerHTML = "Download All";
            })
            .catch((error) => {
              console.error("Error downloading ZIP:", error);
              downloadAllBtn.innerHTML = "Download All";
            });
        }, 5000); // Wait for 5 seconds before sending the download request
      });
      document.getElementById("clear-list").addEventListener("click", () => {
        thumbnails.innerHTML = "";
        resetCompressionState();
      });
    });

  function simulateProgress(progressBarId, downloadButton) {
    let progress = 0;
    const progressBar = document.getElementById(progressBarId);

    function updateProgress() {
      if (progress < 99) {
        progress += Math.floor(Math.random() * 5) + 5;
        if (progress > 99) {
          progress = 99;
        }
        progressBar.style.width = progress + "%";
        progressBar.textContent = progress + "%";
        downloadButton.disabled = true;
        setTimeout(updateProgress, 300);
      }
    }
    updateProgress();
  }

  function completeProgress(progressBarId, savedPercentage, downloadButton) {
    const progressBar = document.getElementById(progressBarId);
    setTimeout(() => {
      progressBar.style.width = "100%";
      progressBar.textContent = "Optimizing...";

      setTimeout(() => {
        progressBar.textContent = `Saved ${savedPercentage.toFixed(2)}%`;
        progressBar.classList.remove("progress-bar-inner");
        progressBar.classList.add("progress-bar-completed");
        downloadButton.disabled = false;
      }, 5000);
    }, 5000);
  }

  function resetCompressionState() {
    resultsContainer.innerHTML = "";
    compressedFiles.clear();
    downloadLinks.length = 0;
    responsesReceived = 0;
    // Clear existing thumbnails
    // allFiles.forEach(file => {
    //   const objectURL = URL.createObjectURL(file);
    //   const img = document.createElement('img');
    //   img.src = objectURL;
    //   img.className = 'h-16 w-16 object-cover rounded';
    //   img.dataset.filename = file.name;
    //   img.dataset.filesize = file.size;
    //   const thumbnail = document.createElement('div');
    //   thumbnail.className = 'relative inline-block group';
    //   const removeBtn = document.createElement('button');
    //   removeBtn.innerHTML = '&times;';
    //   removeBtn.className = 'absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100';
    //   removeBtn.onclick = () => {
    //     thumbnail.remove();
    //     URL.revokeObjectURL(objectURL);
    //     const index = allFiles.indexOf(file);
    //     if (index > -1) {
    //       allFiles.splice(index, 1);
    //     }
    //   };
    //   thumbnails.appendChild(thumbnail);
    //   thumbnail.appendChild(img);
    //   thumbnail.appendChild(removeBtn);
    // });
  }

  // Accordion Logic
  document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", () => {
      const accordionContent = button.nextElementSibling;

      // Close all open accordions except the current one
      document.querySelectorAll(".accordion-button").forEach((btn) => {
        if (btn !== button) {
          btn.setAttribute("aria-expanded", "false");
          btn.nextElementSibling.classList.add("hidden");
        }
      });

      // Toggle the current accordion
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !isExpanded);
      accordionContent.classList.toggle("hidden");
    });
  });
});

//------------------------------------
const menuToggle = document.getElementById("menuToggle"); // Hamburger menu button
const menuClose = document.getElementById("menuClose"); // Close button
const navMenu = document.getElementById("navMenu"); // Navigation menu

// Show menu
menuToggle.addEventListener("click", () => {
  navMenu.classList.remove("-translate-y-full");
  navMenu.classList.add("translate-y-0");
});

// Hide menu
menuClose.addEventListener("click", () => {
  navMenu.classList.remove("translate-y-0");
  navMenu.classList.add("-translate-y-full");
});

// Close menu when clicking outside (optional for mobile)
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("translate-y-0");
    navMenu.classList.add("-translate-y-full");
  }
});
