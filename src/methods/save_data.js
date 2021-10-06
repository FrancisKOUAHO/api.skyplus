import xlsx from "xlsx";

const save_data = (ARRAY_DATA) => {
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(ARRAY_DATA)
    xlsx.utils.book_append_sheet(wb, ws)
    xlsx.writeFile(wb, 'data_linkedin.xlsx')
}

export {
    save_data
}
