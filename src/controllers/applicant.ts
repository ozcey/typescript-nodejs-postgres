import { Request, Response } from "express";
import Applicant from "../models/applicant";


export const createApplicant = async (req: Request, res: Response) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        age,
        gender,
        degree,
        categories,
        languages
    } = req.body;

    let applicant;

    try {
        applicant = await Applicant.create({
            first_name,
            last_name,
            email,
            phone,
            age,
            gender,
            degree,
            categories,
            languages
        });
    } catch (error) {
        res.status(400).json({
            message: 'An error occurred while creating applicant'
        });
    };
    res.status(201).json({
        message: 'Applicant created successfully!',
        data: applicant
    });

};

export const findAllApplicants = async (req: Request, res: Response) => {
    let applicants;
    try {
        applicants = await Applicant.findAll();
    } catch (error) {
        res.status(404).json({
            message: `An error occurred while fetching applicants`
        });
    }
    res.status(200).json({
        applicants
    });
};

export const findApplicantById = async (req: Request, res: Response) => {
    const id = req.params.id;
    let applicant;
    try {
        applicant = await Applicant.findByPk(id);
    } catch (error) {
        res.status(404).json({
            message: `Applicant not found with id ${id}`
        });
    }
    res.status(200).json({
        applicant: applicant
    });
};

export const updateApplicant = async (req: Request, res: Response) => {
    const id = req.params.id;
    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
        return res.status(404).json({
            message: `Applicant not found with id ${id}`
        });
    };

    const {
        first_name,
        last_name,
        email,
        phone,
        age,
        gender,
        degree,
        categories,
        languages
    } = req.body;

    let updatedApplicant;

    try {
        updatedApplicant = await Applicant.update({
            first_name,
            last_name,
            email,
            phone,
            age,
            gender,
            degree,
            categories,
            languages
        }, {
            where: { id: id }
        });
    } catch (error) {
        res.status(400).json({
            message: 'An error occurred while updating applicant'
        });
    };
    res.status(200).json({
        message: 'Applicant updated successfully!',
        data: updateApplicant
    });

};

export const deleteApplicant = async (req: Request, res: Response) => {
    const id = req.params.id;
    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
        return res.status(404).json({
            message: `Applicant not found with id ${id}`
        });
    };

    try {
        await Applicant.destroy();
    } catch (error) {
        res.status(400).json({
            message: 'An error occurred while deleting applicant'
        });
    };
    res.status(200).json({
        message: 'Applicant deleted successfully!',
    });
};