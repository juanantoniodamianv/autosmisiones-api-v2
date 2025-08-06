import { Router } from "express";
import { UploadController } from "../controllers/UploadController";
import { clerkAuth } from "../middlewares/clerkAuth";

const router = Router();

// Rutas para generar URLs firmadas (requieren autenticación)
router.post("/signed-url", clerkAuth, UploadController.generateSignedUrl);
router.post("/signed-urls", clerkAuth, UploadController.generateMultipleSignedUrls);

// Rutas para eliminar archivos (requieren autenticación)
router.delete("/file", clerkAuth, UploadController.deleteFile);

// Ruta para confirmar upload (requiere autenticación)
router.post("/confirm", clerkAuth, UploadController.confirmUpload);

export default router; 