import { Request, Response } from "express";
import Address from "../models/address";
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
        languages,
        address
    } = req.body;

    const { street, city, state, zip_code } = address;
    console.log('body', req.body);

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
            languages,
            addresses: [
                {
                    street,
                    city,
                    state,
                    zip_code
                }
            ]
        },
            {
                include: Address
            }
        );
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while creating applicant',
            error: error
        });
    };
    return res.status(201).json({
        message: 'Applicant created successfully!',
        data: applicant
    });

};

export const findAllApplicants = async (req: Request, res: Response) => {
    let applicants;
    try {
        applicants = await Applicant.findAll();
    } catch (error) {
        return res.status(404).json({
            message: `An error occurred while fetching applicants`,
            error: error
        });
    }
    return res.status(200).json({
        applicants
    });
};

export const findApplicantById = async (req: Request, res: Response) => {
    const id = req.params.id;
    let applicant;
    try {
        applicant = await Applicant.findByPk(id);
    } catch (error) {
        return res.status(404).json({
            message: `Applicant not found with id ${id}`
        });
    }
    return res.status(200).json({
        applicant: applicant
    });
};

// TODO: fix update applicant 
export const updateApplicant = async (req: Request, res: Response) => {
    const id = +req.params.id;
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
        languages,
        address
    } = req.body;

    const { street, city, state, zip_code } = address;
    console.log('body', req.body);

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
            languages,
            addresses: [
                {
                    street,
                    city,
                    state,
                    zip_code
                }
            ]
        },
            {
                where: { id: id }
            }
        );
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while updating applicant',
            error: error
        });
    };
    return res.status(200).json({
        message: 'Applicant updated successfully!',
        data: updateApplicant
    });

};

export const deleteApplicant = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
        return res.status(404).json({
            message: `Applicant not found with id ${id}`
        });
    };

    try {
        await Applicant.destroy({ where: { id: id } });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while deleting applicant',
            error: error
        });
    };
    return res.status(200).json({
        message: 'Applicant deleted successfully!',
    });
};