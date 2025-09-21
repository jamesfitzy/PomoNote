const notes = document.getElementById("app");
const addNoteButton = notes.querySelector(".add-notes");

getNotes().forEach((note) => {
    const element = createNoteElement(note.id, note.content);
    notes.insertBefore(element, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("div");
    element.classList.add("note");
    element.setAttribute('draggable', true);
    element.setAttribute('id', `note-${id}`);

    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);

    const textareaContainer = document.createElement("div");
    textareaContainer.classList.add("textarea-container");

    const textarea = document.createElement("textarea");
    textarea.classList.add("notes");
    textarea.value = content;
    textarea.placeholder = "Enter your notes here..";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => {
        deleteNote(id, element);
    });

    textareaContainer.appendChild(textarea);
    textareaContainer.appendChild(deleteButton);

    element.appendChild(textareaContainer);

    textarea.addEventListener("change", () => {
        updateNote(id, textarea.value);
    });

    return element;
}

function addNote() {
    const notesArray = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const newNote = createNoteElement(noteObject.id, noteObject.content);
    notes.insertBefore(newNote, addNoteButton);

    notesArray.push(noteObject);
    saveNotes(notesArray);
}

function updateNote(id, newContent) {
    const notesArray = getNotes();
    const targetNote = notesArray.find((note) => note.id === id);

    if (targetNote) {
        targetNote.content = newContent;
        saveNotes(notesArray);
    }
}

function deleteNote(id, element) {
    const updatedNotes = getNotes().filter((note) => note.id !== id);
    saveNotes(updatedNotes);
    notes.removeChild(element);
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('dragging');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(notes, e.clientX, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        notes.appendChild(draggable);
    } else {
        notes.insertBefore(draggable, afterElement);
    }
}


function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);

    const afterElement = getDragAfterElement(notes, e.clientX, e.clientY);
    if (afterElement == null) {
        notes.appendChild(draggableElement);
    } else {
        notes.insertBefore(draggableElement, afterElement);
    }
    draggableElement.classList.remove('dragging');

    updateOrderInLocalStorage();
}

function updateOrderInLocalStorage() {
    const noteElements = notes.querySelectorAll('.note');
    const updatedNotesArray = Array.from(noteElements).map(noteElement => {
        return {
            id: noteElement.id.split('-')[1],
            content: noteElement.querySelector('.notes').value
        };
    });

    saveNotes(updatedNotesArray);
}

function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.note:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = Math.sqrt(
            Math.pow(x - (box.left + box.width / 2), 2) + 
            Math.pow(y - (box.top + box.height / 2), 2)
        );

        if (offset < closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.POSITIVE_INFINITY }).element;
}


notes.addEventListener('dragover', dragOver);
notes.addEventListener('drop', drop);

// Add default empty note if none exist
if (getNotes().length === 0) {
    addNote();
}