// // src/controllers/StatusController.ts
// import { Request, Response } from "express";
// import { Status } from "../models/Status";

// class StatusController {
//   // Obtener todos los estados
//   public async getAllStatuses(req: Request, res: Response): Promise<void> {
//     try {
//       const statuses = await Status.findAll();
//       res.json(statuses);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Obtener un estado por ID
//   public async getStatusById(req: Request, res: Response): Promise<void> {
//     try {
//       const status = await Status.findByPk(req.params.id);
//       if (status) {
//         res.json(status);
//       } else {
//         res.status(404).json({ error: "Status not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Crear un nuevo estado
//   public async createStatus(req: Request, res: Response): Promise<void> {
//     try {
//       const status = await Status.create(req.body);
//       res.status(201).json(status);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Actualizar un estado por ID
//   public async updateStatus(req: Request, res: Response): Promise<void> {
//     try {
//       const status = await Status.findByPk(req.params.id);
//       if (status) {
//         await status.update(req.body);
//         res.json(status);
//       } else {
//         res.status(404).json({ error: "Status not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Eliminar un estado por ID
//   public async deleteStatus(req: Request, res: Response): Promise<void> {
//     try {
//       const status = await Status.findByPk(req.params.id);
//       if (status) {
//         await status.destroy();
//         res.status(204).send();
//       } else {
//         res.status(404).json({ error: "Status not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }
// }

// export const statusController = new StatusController();
