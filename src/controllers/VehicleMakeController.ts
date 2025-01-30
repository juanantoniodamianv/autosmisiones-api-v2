// // src/controllers/VehicleMakeController.ts
// import { Request, Response } from "express";
// import { VehicleMake } from "../models/VehicleMake";

// class VehicleMakeController {
//   // Obtener todas las marcas de vehículos
//   public async getAllVehicleMakes(req: Request, res: Response): Promise<void> {
//     try {
//       const makes = await VehicleMake.findAll();
//       res.json(makes);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Obtener una marca de vehículo por ID
//   public async getVehicleMakeById(req: Request, res: Response): Promise<void> {
//     try {
//       const make = await VehicleMake.findByPk(req.params.id);
//       if (make) {
//         res.json(make);
//       } else {
//         res.status(404).json({ error: "VehicleMake not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Crear una nueva marca de vehículo
//   public async createVehicleMake(req: Request, res: Response): Promise<void> {
//     try {
//       const make = await VehicleMake.create(req.body);
//       res.status(201).json(make);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Actualizar una marca de vehículo por ID
//   public async updateVehicleMake(req: Request, res: Response): Promise<void> {
//     try {
//       const make = await VehicleMake.findByPk(req.params.id);
//       if (make) {
//         await make.update(req.body);
//         res.json(make);
//       } else {
//         res.status(404).json({ error: "VehicleMake not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Eliminar una marca de vehículo por ID
//   public async deleteVehicleMake(req: Request, res: Response): Promise<void> {
//     try {
//       const make = await VehicleMake.findByPk(req.params.id);
//       if (make) {
//         await make.destroy();
//         res.status(204).send();
//       } else {
//         res.status(404).json({ error: "VehicleMake not found" });
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

// export const vehicleMakeController = new VehicleMakeController();
