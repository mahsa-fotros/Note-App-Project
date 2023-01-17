import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

const app = document.getElementById("app");
const view = new NotesView(app,{
    onNoteAdd(){
        console.log("the note has been added");
    },
    onNoteEdit(newTitle, newBody){
        console.log(newTitle,newBody);
    },
    onNoteSelect(noteId){
        console.log(noteId)
    }
});

view.updateNotesList(NotesAPI.getAllNotes());