import { describe, expect, test, vi } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from  "../services/dogService";

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

describe("DogController", () => {
    vi.mock("../services/dogService")

    test("Returns expected values", async () =>{
        const req: any = {}
        const res = createMockResponse()
        const payload = {imageUrl: "url", status: "success"}
        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(payload)

        await getDogImage(req, res)

        
        expect(res.json).toHaveBeenCalledWith({
            data: payload,
            success: true
        })
    })
})