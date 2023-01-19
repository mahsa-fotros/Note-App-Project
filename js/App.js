import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes=[];
    this.activeNote=null;
    this.view = new NotesView(root, this._handlers());
    const notes = NotesAPI.getAllNotes();
    this._setNotes(notes);
  }

  _refreshNotes(){
    const notes = NotesAPI.getAllNotes();

    this._setNotes(notes);

    if(notes.length>0){
        this._setActiveNote(notes[0]);
    }
}

_setNotes(notes){
this.notes = notes;
this.view.updateNotesList(this.notes);
}

_setActiveNote(note){
    this.activeNote = note;
    this.view.updateActiveNote(this.activeNote);
}

_handlers() {
    return {
        onNoteAdd: ()=> {
            let newNote = {
                title: "New title...",
                body: "Type note text...",
            };
            NotesAPI.saveNote(newNote);
            this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNote({
            id: this.activeNote.id,
            title: newTitle,
            body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        this.view.updateNotePreviewVisibility(true);
        const selectedNote = this.notes.find(n=> n.id == noteId);
        this._setActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
