import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(express.json());

// Configurar Lowdb
const adapter = new JSONFile("db.json");
// Passar dados padrão (default data)
const db = new Low(adapter, { tarefas: [] });

// Inicializar banco de dados
async function initDB() {
  await db.read();
  db.data ||= { tarefas: [] }; // criar array se não existir
  await db.write();
}
initDB();

// Listar tarefas
app.get("/tarefas", async (req, res) => {
  await db.read();
  res.json(db.data.tarefas);
});

// Criar nova tarefa
app.post("/tarefas", async (req, res) => {
  await db.read();
  const tarefa = { id: Date.now(), texto: req.body.texto, completed: false };
  db.data.tarefas.push(tarefa);
  await db.write();
  res.json(tarefa);
});

// Atualizar tarefa (concluir)
app.put("/tarefas/:id", async (req, res) => {
  await db.read();
  const tarefa = db.data.tarefas.find((t) => t.id == req.params.id);
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });

  tarefa.completed = req.body.completed;
  await db.write();
  res.json(tarefa);
});

// Deletar tarefa
app.delete("/tarefas/:id", async (req, res) => {
  await db.read();
  db.data.tarefas = db.data.tarefas.filter((t) => t.id != req.params.id);
  await db.write();
  res.json({ mensagem: "Tarefa deletada" });
});

// Rodar servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
