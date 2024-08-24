import React from "react";
import "../styles/Note.css"

function Note({note, onDelete}){
    const formattedDate = new Date(note.create_at).toLocaleDateString("es-MX")

    return <div className="note">
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
            Borrar nota
        </button>
    </div>
}

export default Note