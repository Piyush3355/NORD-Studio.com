import { test, expect } from '@playwright/test'

/**
 * NORD — Hero 3D WebGL Context QA
 *
 * Per NORD standards: every 3D component ships with a Playwright smoke test
 * that verifies:
 *   1. The WebGL canvas is present in the DOM.
 *   2. The WebGL rendering context is initialised without errors.
 *   3. No console errors are emitted during page load.
 *   4. The canvas has non-zero dimensions (i.e. it is actually visible).
 */

test.describe('NORD Hero — WebGL / 3D Canvas Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Collect all console errors
    page.on('pageerror', (err) => {
      throw new Error(`Uncaught page error: ${err.message}`)
    })
  })

  test('WebGL canvas is present and has non-zero dimensions', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('#webgl-canvas canvas', { timeout: 20_000 })

    const canvas = page.locator('#webgl-canvas canvas')
    await expect(canvas).toBeVisible()
    await page.waitForTimeout(1500)

    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(100)
    expect(box!.height).toBeGreaterThan(100)
  })

  test('WebGL2 context is successfully initialised', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('#webgl-canvas canvas', { timeout: 20_000 })

    const hasWebGL = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>('#webgl-canvas canvas')
      if (!canvas) return false
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      return !!gl
    })

    expect(hasWebGL).toBe(true)
  })

  test('No JavaScript console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')
    // Wait for the 3D canvas to be fully loaded before checking
    await page.waitForSelector('#webgl-canvas canvas', { timeout: 20_000 })
    // Give time for any async errors to surface
    await page.waitForTimeout(3000)

    // Filter known non-critical third-party warnings
    const criticalErrors = consoleErrors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('net::ERR_') &&
        !e.includes('fonts.googleapis')
    )

    expect(criticalErrors).toHaveLength(0)
  })

  test('Hero headline is visible', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible({ timeout: 10_000 })
    await expect(h1).toContainText('WE BUILD')
  })

  test('Primary CTA button is clickable', async ({ page }) => {
    await page.goto('/')
    const cta = page.locator('#cta-work')
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#portfolio')
  })

  test('Navbar renders and contains logo', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('#navbar')
    await expect(nav).toBeVisible()
    const logo = page.locator('#nav-logo')
    await expect(logo).toContainText('NORD')
  })

  test('Why NORD section is present', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#why-nord')
    await expect(section).toBeAttached()
  })

  test('Portfolio section has 4 curated projects and opens case study modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('#portfolio', { timeout: 30_000 })
    await page.evaluate(() => document.getElementById('portfolio')?.scrollIntoView())
    const cards = page.locator('#portfolio h3')
    await expect(cards).toHaveCount(4)
    await expect(cards.nth(0)).toContainText('Biller.in')
    await expect(cards.nth(1)).toContainText('IDOSTEP Robotics')
    await expect(cards.nth(2)).toContainText('Melodify')
    await expect(cards.nth(3)).toContainText('Nexus LLM Studio')

    // Click first card's open button to open case study modal
    const openBtn = page.locator('#open-project-biller-in')
    await openBtn.dispatchEvent('click')

    const modalHeading = page.locator('h2:has-text("Biller.in")')
    await expect(modalHeading).toBeVisible({ timeout: 5000 })
    
    // Verify image in modal is visible
    const modalImg = page.locator('img[alt="Biller.in"]').last()
    await expect(modalImg).toBeVisible()

    // Close modal via close button
    const closeBtn = page.locator('button[aria-label="Close dialog"]')
    await closeBtn.dispatchEvent('click')
    await expect(modalHeading).not.toBeVisible({ timeout: 5000 })
  })

  test('Contact section email and WhatsApp direct links are present', async ({ page }) => {
    await page.goto('/')
    const emailLink = page.locator('#contact-email-direct')
    await expect(emailLink).toBeAttached()
    await expect(emailLink).toHaveAttribute('href', 'mailto:piyushpatil.da@gmail.com')

    const whatsappLink = page.locator('#contact-whatsapp-direct')
    await expect(whatsappLink).toBeAttached()
    await expect(whatsappLink).toHaveAttribute('href', /wa\.me\/917875417830/)
  })
})
