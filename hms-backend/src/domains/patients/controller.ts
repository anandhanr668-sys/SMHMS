// src/domains/patients/controller.ts

import { Request, Response } from "express";
import { patientService } from "./service.js";

export const createPatientController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const patient = await patientService.createPatient(req.body);

  res.status(201).json({
    success: true,
    data: patient
  });
};
