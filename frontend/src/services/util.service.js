export const utilService = {
    formatDate
}


function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString() 
}