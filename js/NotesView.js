export default class NotesView {
  constructor(root, handler) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect } = handler;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;

    this.root.innerHTML = `
    <div class="notes__sidebar">
            <div class="notes__button">
                <button class="notes__add">Add Note</button>
            </div>
            <div class="notes__preview">
                <textarea class="notes__title" placeholder="Type note title..."></textarea>
                <textarea class="notes__body" placeholder="Type note text..."></textarea>
            </div>
    </div>
    <div class="notes__list">
    </div>`;

    const noteAddBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    noteAddBtn.addEventListener("click", () => {
      inputTitle.style.display = "block";
      inputBody.style.display = "block";
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });
  }

  _createListItemHTML(id, title, body, updated) {
      return `<div class="notes__list-item" data-note-id="${id}">
      <div class="notes__item-title">${title}</div>
      <div class="notes__item-text">${body}</div>
      <div class="note__item-date">${new Date(updated).toLocaleString(
          "en",
                  {
                    dateStyle: "full",
                    timeStyle: "short",
                  }
                )}</div>
                <div class="notes__item-icon">
                <i class="fas fa-trash-alt fa-lg"></i>
                </div>
     </div>`;
  }

  updateNotesList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");
    
    notesContainer.innerHTML="";
    let notesList="";
    for(const note of notes){
        const {id,title,body,updated}= note;
        const noteHtml= this._createListItemHTML(id,title,body,updated);
        notesList+=noteHtml;
    }
    notesContainer.innerHTML=notesList;
    notesContainer.querySelectorAll(".notes__list-item").forEach(noteItem=>{
        noteItem.addEventListener("click",()=>{
            this.onNoteSelect(noteItem.dataset.noteId);
        })
    });

  }
}
