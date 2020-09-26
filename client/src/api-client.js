import axios from 'axios'

const port = axios.create({
    baseURL: 'http://localhost:8080',
})

export const insertFruit = payload => port.post(`/fruit`, payload)
export const getAllFruits = () => port.get(`/fruits`)
export const updateFruitById = (id, payload) => port.put(`/fruit/${id}`, payload)
export const deleteFruitById = id => port.delete(`/fruit/${id}`)
export const getFruitById = id => port.get(`/fruit/${id}`)

const apiClient = {
    insertFruit,
    getAllFruits,
    updateFruitById,
    deleteFruitById,
    getFruitById,
}

export default apiClient