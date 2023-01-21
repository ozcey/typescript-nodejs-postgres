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
        address: { street, city, state, zip_code }
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
    return res.status(201).json(applicant);

};

export const findAllApplicants = async (req: Request, res: Response) => {
    let applicants;
    try {
        applicants = await Applicant.findAll({ include: Address });
    } catch (error) {
        return res.status(404).json({
            message: `An error occurred while fetching applicants`,
            error: error
        });
    }
    return res.status(200).json(applicants);
};

export const findApplicantById = async (req: Request, res: Response) => {
    const id = req.params.id;
    let applicant;
    try {
        applicant = await Applicant.findByPk(id, { include: Address });
        if (!applicant) {
            return res.status(404).json({
                message: `Applicant not found with id ${id}`
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `An error occurred while fetching applicant`
        });
    }

    return res.status(200).json(applicant);
};

export const updateApplicant = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const applicant = await Applicant.findByPk(id, { include: Address });
    if (!applicant) {
        return res.status(404).json({
            message: `Applicant not found with id ${id}`
        });
    };

    const existingAddress = await Address.findOne({ where: { applicantId: id } });
    if (!existingAddress) {
        return res.status(404).json({
            message: `Address not found with applicant id ${id}`
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
        address: { street, city, state, zip_code }
    } = req.body;

    try {
        applicant.set({
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
        existingAddress.set({
            street,
            city,
            state,
            zip_code
        });
        await applicant.save();
        await existingAddress.save();
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while updating applicant',
            error: error
        });
    };
    return res.status(200).json({
        message: `Applicant with id: ${id} updated successfully.`
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
        message: `Applicant with id ${id} deleted successfully.`,
    });
};