export const getDataFromLocalStorage = () => {
    const data = localStorage.getItem("input")
    return JSON.parse(data) // []
}