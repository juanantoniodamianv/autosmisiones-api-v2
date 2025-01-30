// // src/controllers/VehicleCustomDataController.ts
// import { Request, Response } from "express";
// import { VehicleCustomData } from "../models/VehicleCustomData";

// class VehicleCustomDataController {
//   // Obtener todos los datos personalizados de vehículos
//   public async getAllVehicleCustomData(
//     req: Request,
//     res: Response
//   ): Promise<void> {
//     try {
//       const customData = await VehicleCustomData.findAll();
//       res.json(customData);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Obtener datos personalizados de un vehículo por ID
//   public async getVehicleCustomDataById(
//     req: Request,
//     res: Response
//   ): Promise<void> {
//     try {
//       const customData = await VehicleCustomData.findByPk(req.params.id);
//       if (customData) {
//         res.json(customData);
//       } else {
//         res.status(404).json({ error: "VehicleCustomData not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Crear nuevos datos personalizados para un vehículo
//   public async createVehicleCustomData(
//     req: Request,
//     res: Response
//   ): Promise<void> {
//     try {
//       const customData = await VehicleCustomData.create(req.body);
//       res.status(201).json(customData);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Actualizar datos personalizados de un vehículo por ID
//   public async updateVehicleCustomData(
//     req: Request,
//     res: Response
//   ): Promise<void> {
//     try {
//       const customData = await VehicleCustomData.findByPk(req.params.id);
//       if (customData) {
//         await customData.update(req.body);
//         res.json(customData);
//       } else {
//         res.status(404).json({ error: "VehicleCustomData not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Eliminar datos personalizados de un vehículo por ID
//   public async deleteVehicleCustomData(
//     req: Request,
//     res: Response
//   ): Promise<void> {
//     try {
//       const customData = await VehicleCustomData.findByPk(req.params.id);
//       if (customData) {
//         await customData.destroy();
//         res.status(204).send();
//       } else {
//         res.status(404).json({ error: "VehicleCustomData not found" });
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

// export const vehicleCustomDataController = new VehicleCustomDataController();
