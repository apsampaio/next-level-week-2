import express from "express";

import ClassesController from "./app/controllers/classesController";
import ConnectionController from "./app/controllers/connectionsController";

const classesController = new ClassesController();
const connectionController = new ConnectionController();

const routes = express.Router();

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.index);

routes.post("/connections", connectionController.create);
routes.get("/connections", connectionController.index);

export default routes;
