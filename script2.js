document.addEventListener("DOMContentLoaded", function () {
    const draggables = document.querySelectorAll(".draggable");
    const canvas = document.getElementById("canvas");

    // Enable dragging from toolbar
    draggables.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
        });
    });

    // Allow drop on the canvas
    canvas.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    canvas.addEventListener("drop", (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        const element = document.getElementById(itemId).cloneNode(true);
        element.id = `${itemId}-${Date.now()}`; // Unique ID to avoid duplicates
        element.style.position = "absolute";
        element.style.left = `${e.clientX - canvas.offsetLeft}px`;
        element.style.top = `${e.clientY - canvas.offsetTop}px`;
        element.classList.add("placed-item");

        makeDraggable(element);
        canvas.appendChild(element);
    });

    // Enable movement of placed elements
    function makeDraggable(element) {
        let draggedElement = null;
        let offsetX = 0, offsetY = 0;

        element.addEventListener("mousedown", (e) => {
            draggedElement = element;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (!draggedElement) return;

            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            // Keep within canvas boundaries
            const rect = canvas.getBoundingClientRect();
            const elemWidth = draggedElement.offsetWidth;
            const elemHeight = draggedElement.offsetHeight;

            x = Math.max(0, Math.min(x, rect.width - elemWidth));
            y = Math.max(0, Math.min(y, rect.height - elemHeight));

            draggedElement.style.left = `${x}px`;
            draggedElement.style.top = `${y}px`;
        });

        document.addEventListener("mouseup", () => {
            if (draggedElement) {
                draggedElement.style.cursor = "grab";
                draggedElement = null;
            }
        });
    }
});


// document.addEventListener("DOMContentLoaded", function () {
//     const draggables = document.querySelectorAll(".draggable");
//     const canvas = document.getElementById("canvas");

//     draggables.forEach(item => {
//         item.addEventListener("dragstart", (e) => {
//             e.dataTransfer.setData("text/plain", e.target.id);
//         });
//     });

//     canvas.addEventListener("dragover", (e) => {
//         e.preventDefault();
//     });

//     canvas.addEventListener("drop", (e) => {
//         e.preventDefault();
//         const itemId = e.dataTransfer.getData("text/plain");
//         const element = document.getElementById(itemId).cloneNode(true);
//         element.style.position = "absolute";
//         element.style.left = `${e.clientX - canvas.offsetLeft}px`;
//         element.style.top = `${e.clientY - canvas.offsetTop}px`;
//         canvas.appendChild(element);
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const canvas = document.getElementById("canvas");
//     let draggedElement = null;
//     let offsetX = 0, offsetY = 0;

//     // Function to allow moving elements
//     function makeDraggable(element) {
//         element.addEventListener("mousedown", (e) => {
//             draggedElement = element;
//             offsetX = e.clientX - element.offsetLeft;
//             offsetY = e.clientY - element.offsetTop;
//             element.style.cursor = "grabbing";
//         });

//         document.addEventListener("mousemove", (e) => {
//             if (!draggedElement) return;
//             let x = e.clientX - offsetX;
//             let y = e.clientY - offsetY;

//             // Keep within canvas boundaries
//             const rect = canvas.getBoundingClientRect();
//             const elemWidth = draggedElement.offsetWidth;
//             const elemHeight = draggedElement.offsetHeight;

//             x = Math.max(rect.left, Math.min(x, rect.right - elemWidth));
//             y = Math.max(rect.top, Math.min(y, rect.bottom - elemHeight));

//             draggedElement.style.left = `${x}px`;
//             draggedElement.style.top = `${y}px`;
//         });

//         document.addEventListener("mouseup", () => {
//             if (draggedElement) {
//                 draggedElement.style.cursor = "grab";
//                 draggedElement = null;
//             }
//         });
//     }

//     // Example: Adding an element dynamically
//     canvas.addEventListener("click", (e) => {
//         const newElement = document.createElement("div");
//         newElement.classList.add("draggable-item");
//         newElement.style.position = "absolute";
//         newElement.style.left = `${e.clientX - canvas.offsetLeft}px`;
//         newElement.style.top = `${e.clientY - canvas.offsetTop}px`;

//         makeDraggable(newElement);
//         canvas.appendChild(newElement);
//     });
// });
