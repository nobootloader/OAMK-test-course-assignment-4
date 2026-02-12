import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";


describe("DogService", () => {
    
    beforeEach(() => {
        global.fetch = vi.fn()
    })
    afterEach(() => {
        vi.clearAllMocks()
        vi.resetAllMocks()
        })

    test("Returns expected values", async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({ 
                message: "https://images.dog.jpg",
                status: "success",
            }),
        } as Response)
        const result = await getRandomDogImage()
        
        const expectedImageUrl = "https://images.dog.jpg"
        const expectedStatus = "success"
        expect(result.imageUrl).toEqual(expectedImageUrl)
        expect(result.status).toEqual(expectedStatus)
        expect(fetch).toHaveBeenCalledOnce()

    })
    test("Throws error when API call fails", async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 500,
        } as Response)
        await expect(getRandomDogImage()).rejects.toThrow(
            "Failed to fetch dog image: Dog API returned status 500"
        )
    })
})