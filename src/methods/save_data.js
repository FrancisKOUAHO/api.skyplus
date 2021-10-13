import xlsx from "xlsx";
import path from "path";
import moment from "moment";
import {random_in_from_interval} from "./random_in_from_interval";
const __dirname = path.resolve('public');

const startDate = moment().format('YYYY-MM-DD');


const save_data = (ARRAY_DATA) => {
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(ARRAY_DATA)
    let file_excel = __dirname + `/${startDate}-${random_in_from_interval(0, 1000000000)}.xlsx`
    xlsx.utils.book_append_sheet(wb, ws)
    xlsx.writeFile(wb, file_excel)
}

export {
    save_data
}
