document.addEventListener("DOMContentLoaded", function () {
    const draggables = document.querySelectorAll(".draggable");
    const canvas = document.getElementById("canvas");
    const view3DButton = document.getElementById("view-3d-btn");

    let placedElements = [];

    // Enable dragging from toolbar
    draggables.forEach(item => {
        item.addEventListener("dragstart", (e) => {
                console.log("Dragging: ", e.target.id);
                e.dataTransfer.setData("text/plain", e.target.id);
        });
    });

    // Allow drop on canvas
    canvas.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    canvas.addEventListener("drop", (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        const element = document.getElementById(itemId).cloneNode(true);

        element.id = `${itemId}-${Date.now()}`;
        element.style.position = "absolute";
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.classList.add("placed-item");

        makeDraggable(element);
        canvas.appendChild(element);
        
        // Save this to localStorage so we can retrieve it in the 3D page
        const objData = {
            id: itemId,
            type: "box", // or any object type
            position: { x, y }
        };

        let storedObjects = JSON.parse(localStorage.getItem("objects")) || [];
        storedObjects.push(objData);
        localStorage.setItem("objects", JSON.stringify(storedObjects));
        console.log(storedObjects)
        console.log("Object stored for 3D:", objData);
        // placedElements.push({
        //     id: element.id,
        //     type: itemId, 
        //     x: element.style.left,
        //     y: element.style.top
        // });

        // // Show the 3D button if elements exist
        // if (placedElements.length > 0) {
        //     view3DButton.style.display = "block";
        // }
    });

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

    // Redirect to 3D View Page
    view3DButton.addEventListener("click", () => {
        localStorage.setItem("canvasData", JSON.stringify(placedElements));
        window.location.href = "3d-view.html";
    });
});
