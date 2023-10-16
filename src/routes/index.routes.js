// Importar el enrutador
import { Router } from "express";

// Importar el modelo de datos
import Task from "../models/Task";

const router = Router();

// Mostrar lista de datos
router.get("/", async (req,res) => {
  const tasks = await Task.find().lean();
  res.render("index", {tasks: tasks})
}); 

// Grabar los datos del formulario
router.post("/tasks/add", async (req, res) => {
  try {
    const task = Task(req.body);

    const taskSaved = await task.save();

    console.log(taskSaved);

    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

// Ruta para eliminar un item de la base de datos
router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

// Ruta para marcar la tarea como realizada o no
router.get("/toogleDone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.done = !task.done;
    await task.save();
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

// Ruta para cargar el formulario de modificación de datos
router.get("/edit/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    res.render("edit", { task });
  } catch (error) {
    console.error(error.message);
  }
});

// Ruta para guardar los cambios de datos
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body);
  console.log(req.body); // opcional
  res.redirect("/");
});

// Exportar para poder usar desde otro archivo
export default router;
