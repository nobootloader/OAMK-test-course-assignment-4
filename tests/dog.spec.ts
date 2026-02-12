import {test, expect } from '@playwright/test'

test.describe("Random Dog", () =>{
    test("Dog image retrieved on page load", async ({page}) => {

        await page.goto('/')

        const responsePromise = page.waitForResponse('**/api/dogs/random')
        await responsePromise

        const img = page.getByAltText("Random dog")
        await expect(img).toHaveAttribute("src")
        const imgSrc = await img.getAttribute("src")
        expect(imgSrc).toMatch(/^https:\/\//)
    })
    test("Dog image is retrieved on button press", async ({page}) => {

        await page.goto('/')

        await page.getByText("Get Another Dog").click()
        const responsePromise = page.waitForResponse('**/api/dogs/random')
        await responsePromise

        const img = page.getByAltText("Random dog")
        await expect(img).toHaveAttribute("src")
        const imgSrc = await img.getAttribute("src")
        expect(imgSrc).toMatch(/^https:\/\//)

    })
    test("Error message is shown when API call fails", async ({page}) => {

        
        await page.route('**/api/dogs/random', async (route) => {
            await route.abort()
        })

        await page.goto('/')
        const errorElement = page.getByText(/error/i)
        await expect(errorElement).toContainText(/error/i)
        await expect(errorElement).toBeVisible()
        

        
        
    })
})