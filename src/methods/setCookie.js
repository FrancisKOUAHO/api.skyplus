const setCookie = (page, name, value, domain) => {
    page.setCookie({
        'name': name,
        'value': value,
        'domain': domain
    })
}

export {
    setCookie
}
