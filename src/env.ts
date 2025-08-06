export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";
export const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
export const PORT = process.env.PORT || 3000;
export const API_URL = `http://localhost:${PORT}`;

// AWS S3 Configuration
export const AWS_REGION = process.env.AWS_REGION || "us-east-1";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "autosmisiones-uploads";
export const AWS_S3_BUCKET_URL = process.env.AWS_S3_BUCKET_URL || `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com`;
