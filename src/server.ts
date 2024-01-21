import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import { notes } from "./data";
import { Note } from "./interface/note.interface";
import { v4 as uuidv4 } from "uuid";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NoteInputDTO } from "./dto/note-input.dto";

const app: Express = express();
const port: number = 3000;
app.use(bodyParser.json());

//Create Note
app.post("/notes", async (req: Request, res: Response): Promise<void> => {
  const noteInput = plainToInstance(NoteInputDTO, req.body);
  const errors = await validate(noteInput);
  const frmtErrors = errors.map((x) => {
    return Object.values(
      x.constraints as {
        [type: string]: string;
      }
    );
  });

  if (errors.length > 0) {
    res.send({ validationErrors: frmtErrors.flat(1) });
    return;
  }

  const date = new Date();
  const id: string = uuidv4();
  const note: Note = { ...req.body, dateCreated: date, dateModified: date, id };

  notes.push(note);

  res.send("Note Successfully Created");
});

//Get All Notes
app.get("/notes", async (req: Request, res: Response): Promise<void> => {
  res.send(notes);
});

//Get Specific Note
app.get("/notes/:id", async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const note = notes.find((x: Note) => x.id === id);

  if (!note) {
    res.send("Note does not exist");
    return;
  }

  res.send(note);
});

//Update Note
app.put("/notes/:id", async (req: Request, res: Response): Promise<void> => {
  const noteInput = plainToInstance(NoteInputDTO, req.body);
  const errors = await validate(noteInput);
  const frmtErrors = errors.map((x) => {
    return Object.values(
      x.constraints as {
        [type: string]: string;
      }
    );
  });

  if (errors.length > 0) {
    res.send({ validationErrors: frmtErrors.flat(1) });
    return;
  }

  const id = req.params.id;
  const { title, body } = req.body as Note;
  let ind: number | undefined;
  const date = new Date();
  let note: Note | undefined = notes.find((element: Note, index: number) => {
    if (element.id === id) {
      ind = index;
      return true;
    }
  });

  if (!note) {
    res.send("Note does not exist");
    return;
  }

  notes[ind as number] = { ...(note as Note), title, body, dateModified: date };

  res.send("Note is updated");
});

//Delete Note
app.delete("/notes/:id", async (req: Request, res: Response): Promise<void> => {
  let ind: number | undefined;
  let isNoteExists: boolean = false;
  const id = req.params.id;

  notes.find((element: Note, index: number) => {
    if (id === element.id) {
      ind = index;
      isNoteExists = true;
      return true;
    }
  });

  if (!isNoteExists) {
    res.send("Note does not exist");
    return;
  }

  notes.splice(ind as number, 1);

  res.send("Note is deleted");
});

app.listen(port, () => {
  console.log(`[Server]: Now running at https://localhost: ${port}`);
});
