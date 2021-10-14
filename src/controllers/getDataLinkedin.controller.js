import {Client} from "../models/clients";

const getDataLinkedinController = async (req, res) => {
    Client.find((error, data) => {
        if (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: `${error} sur la récuperation des données ❌`,
                }
            );
        } else {
            return res.status(201).json(
                {
                    data: data,
                    success: true,
                    message: "Récuperation des données ✅",
                }
            );
        }
    })
}

export {
    getDataLinkedinController
}
