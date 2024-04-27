const sql = require("better-sqlite3");
const db = new sql("projects.db");

// Creazione della tabella dei progetti
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        slug TEXT NOT NULL
    )
`
).run();
//creacione della tabella delle liste
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
`
).run();
// Creazione della tabella delle attività (tasks)

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        atList TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
`
).run();

// Funzione per inizializzare i dati dei progetti e delle attività
async function initData() {
  const stmtProject = db.prepare(`
        INSERT INTO projects (title, description, slug)
        VALUES (@title, @description,@slug)
    `);
const stmtList = db.prepare(
  `
  INSERT INTO lists (project_id, title)
  VALUES (@project_id, @title)
`
  
)
  const stmtTask = db.prepare(`
        INSERT INTO tasks (project_id, title, description, status,atList)
        VALUES (@project_id, @title, @description, @status,@atList)
    `);

  // Ciclo attraverso ogni progetto e inseriscilo nel database
  for (const project of dummyProjects) {
    const projectResult = stmtProject.run(project);
    for (const list of project.lists) {
      stmtList.run({
        project_id: projectResult.lastInsertRowid,
        title: list.title
      });
    }
    // Inserisci le attività associate a ciascun progetto nel database
    for (const task of project.tasks) {
      stmtTask.run({
        project_id: projectResult.lastInsertRowid,
        title: task.title,
        description: task.description,
        status: task.status,
        atList: task.atList
      });
    }
  }
}

// Dummy data per i progetti e le attività
const dummyProjects = [
  {
    title: "Progetto 1",
    description: "Descrizione del Progetto 1",
    creator: "John Doe",
    creator_email: "johndoe@example.com",
    lists: [{
      title : "DONE"
    }
    ],
    tasks: [
      {
        title: "Task 1",
        description: "Descrizione del Task 1",
        status: "to do",
        created: "Friday, Jul 2, 2021",
        atList: "DONE",
      },
      {
        title: "Task 2",
        description: "Descrizione del Task 2",
        status: "in progress",
        created: "Friday, Jul 2, 2021",
        atList: "DONE",
      },
      {
        title: "Task 3",
        description: "Descrizione del Task 3",
        status: "done",
        created: "Friday, Jul 2, 2021",
        atList: "DONE",
      },
    ],
    slug: "progetto1",
  },
];

// Inizializza i dati dei progetti e delle attività
initData();
