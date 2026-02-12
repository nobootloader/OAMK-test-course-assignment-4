import {test, expect } from '@playwright/test'

test.describe("Dog API frontend", () =>{
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
        const responsePromise = page.waitForResponse('**/api/dogs/random')
        await responsePromise

        await page.getByText("Get Another Dog").click()
        await responsePromise

        const img = page.getByAltText("Random dog")
        await expect(img).toHaveAttribute("src")
        const imgSrc = await img.getAttribute("src")
        expect(imgSrc).toMatch(/^https:\/\//)

    })
})