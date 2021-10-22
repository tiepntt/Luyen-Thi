import api from ".."

const baseUrl = "/exam"
export const examApi = {
    getExam: (documentId:string) => {
        return api.get(`${baseUrl}/${documentId}`)
    }
}