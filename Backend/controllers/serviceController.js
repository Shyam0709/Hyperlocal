import Service from '../models/Service.js';

export const createService = async(req,res)=>{
    try{
        const service = await Service.create({
            ...req.body,
            providerId: req.user._id,

        });
        res.status(201).json({ message: 'Service created successfully', service: service });
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
}

export const getAllServices = async(req,res)=>{
    try{
        const services = await Service.find().populate('providerId', 'username');
        res.status(200).json(services);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
