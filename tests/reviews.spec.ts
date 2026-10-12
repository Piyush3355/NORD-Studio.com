import { test, expect } from '@playwright/test'

test.describe('NORD — Minimalist Continuous Client Reviews Verification', () => {
  test('Reviews section renders in continuous 3-card frame layout without images', async ({ page }) => {
    test.setTimeout(180_000)
    await page.goto('/')
    const reviewsSection = page.locator('#reviews')
    await expect(reviewsSection).toBeAttached()

    // Heading verification
    await expect(reviewsSection.locator('h2')).toContainText('Real Feedback from Real Founders.')

    // Verify images were removed per user instructions
    const avatarImages = reviewsSection.locator('img')
    await expect(avatarImages).toHaveCount(0)

    // Verify Nikhil Patil from Nandurbar, Maharashtra is present
    await expect(reviewsSection).toContainText('Nikhil Patil')
    await expect(reviewsSection).toContainText('Nandurbar, Maharashtra')
    await expect(reviewsSection).toContainText('NP')

    // Verify continuous status indicator
    await expect(reviewsSection).toContainText('Continuously Running')

    // Scroll reviews section into view
    await reviewsSection.scrollIntoViewIfNeeded()

    // Verify modal detail button opens minimalist case modal
    const detailsBtn = page.locator('#reviews button:has-text("Case Details")').first()
    await detailsBtn.dispatchEvent('click')

    const modal = page.locator('#reviews').locator('text=Audited Engineering Benchmark')
    await expect(modal).toBeVisible({ timeout: 10_000 })
    await expect(page.locator('#reviews')).toContainText('Before NORD')
    await expect(page.locator('#reviews')).toContainText('After NORD Deployment')

    // Close modal via Escape key
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible({ timeout: 10_000 })
  })

  test('Navbar contains Reviews link', async ({ page }) => {
    await page.goto('/')
    const reviewsNavLink = page.locator('#navbar a[href="#reviews"]')
    await expect(reviewsNavLink).toBeVisible()
    await expect(reviewsNavLink).toHaveText('Reviews')
  })
})
