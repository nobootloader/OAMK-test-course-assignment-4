import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import * as dogController from "../controllers/dogController"
import { app } from '../index'
import { Request, Response } from 'express'
import request from 'supertest'
vi.mock("../controllers/dogController")

describe("DogRoute", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    afterEach(() => {
        vi.resetAllMocks()
    })

    test("GET /api/dogs/random returns a random dog", async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
                res.status(200).json({
                    success: true,
                    data: {
                        imageUrl: "url",
                        status: "success"
                    }
                })

            })
        const res = await request(app)
            .get("/api/dogs/random")

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            success: true,
            data: {
                imageUrl: "url",
                status: "success"
            }
        })
    })
    test("GET /api/dogs/random returns 500 when a random dog cannot be fetched", async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
                res.status(500).json({
                    success: false,
                    error: "Failed to fetch dog image: Network error"
                })
            })
        const res = await request(app)
            .get("/api/dogs/random")
        expect(res.status).toBe(500)
        expect(res.body).toEqual({
            success: false,
            error: "Failed to fetch dog image: Network error"
        })
        }
    )
})
