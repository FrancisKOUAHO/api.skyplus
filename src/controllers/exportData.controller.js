import {Client} from "../models/clients";
import moment from "moment";
import xlsx from "xlsx";
import {random_in_from_interval} from "../methods/random_in_from_interval";
import path from "path";
const __dirname = path.resolve('public');


const exportDataController = async (req, res) => {
    Client.find((error, data) => {
        if (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: `${error} Télechargement impossible du fichier excel ❌`,
                }
            );
        } else {
            const startDate = moment().format('YYYY-MM-DD');
            const wb = xlsx.utils.book_new()
            const ws = xlsx.utils.json_to_sheet(data)
            let file_excel = __dirname + `/${startDate}-${random_in_from_interval(0, 1000000000)}.xlsx`
            xlsx.utils.book_append_sheet(wb, ws)
            let file = xlsx.writeFile(wb, file_excel)
            return res.status(201).json(
                {
                    data: file,
                    success: true,
                    message: "Télechargement du fichier excel ✅",
                }
            );
        }
    })
}


export {
    exportDataController
}
