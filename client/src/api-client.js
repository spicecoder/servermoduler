import axios from 'axios'

const db = axios.create({
    baseURL: 'http://localhost:8080',
})

export const insertFruit = payload => db.post(`/fruit`, payload)
export const getAllFruits = () => db.get(`/fruits`)
export const updateFruitById = (id, payload) => db.put(`/fruit/${id}`, payload)
export const deleteFruitById = id => db.delete(`/fruit/${id}`)
export const getFruitById = id => db.get(`/fruit/${id}`)

const apiClient = {
    insertFruit,
    getAllFruits,
    updateFruitById,
    deleteFruitById,
    getFruitById,
}

export default apiClient