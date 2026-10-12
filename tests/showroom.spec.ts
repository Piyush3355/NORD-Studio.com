import { test, expect } from '@playwright/test'

test.describe('NORD — 3D Lab / Showroom Interactive Showcase Verification', () => {
  test('Navbar displays 3D Lab with glowing emerald indicator', async ({ page }) => {
    await page.goto('/')
    const showroomLink = page.locator('#nav-link-showroom')
    await expect(showroomLink).toBeVisible()
    await expect(showroomLink).toContainText('3D Lab')

    // Verify emerald glowing indicator dot exists
    const indicator = showroomLink.locator('span')
    await expect(indicator).toBeVisible()
    await expect(indicator).toHaveClass(/bg-emerald-400/)
  })

  test('Clicking 3D Lab routes smoothly to /showroom and renders 3D viewport', async ({ page }) => {
    await page.goto('/')
    const showroomLink = page.locator('#nav-link-showroom')
    await showroomLink.click()

    await expect(page).toHaveURL(/\/showroom/)
    await page.waitForSelector('#showroom-root', { timeout: 15_000 })
    await page.waitForSelector('#showroom-canvas-container canvas', { timeout: 15_000 })

    const canvas = page.locator('#showroom-canvas-container canvas')
    await expect(canvas).toBeVisible()
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(200)
    expect(box!.height).toBeGreaterThan(200)
  })

  test('Model tab switcher toggles Furniture, Robotics, and Industrial models', async ({ page }) => {
    await page.goto('/showroom')
    await page.waitForSelector('#showroom-model-tabs', { timeout: 15_000 })

    const furnitureTab = page.locator('#model-tab-furniture')
    const roboticsTab = page.locator('#model-tab-robotics')
    const industrialTab = page.locator('#model-tab-industrial')

    await expect(furnitureTab).toBeVisible()
    await expect(roboticsTab).toBeVisible()
    await expect(industrialTab).toBeVisible()

    // Switch to Robotics
    await roboticsTab.click()
    await page.waitForTimeout(500)
    await expect(page.locator('#showroom-root')).toContainText('Autonomous Inspection Drone')

    // Switch to Industrial
    await industrialTab.click()
    await page.waitForTimeout(500)
    await expect(page.locator('#showroom-root')).toContainText('Aerospace Jet Turbine Cutaway')

    // Switch back to Furniture
    await furnitureTab.click()
    await page.waitForTimeout(500)
    await expect(page.locator('#showroom-root')).toContainText('Lounge Armchair & Pedestal')
  })

  test('Material dock toggles presets and auto-rotate switch works', async ({ page }) => {
    await page.goto('/showroom')
    await page.waitForSelector('#showroom-bottom-dock', { timeout: 15_000 })

    // Material buttons
    const walnutBtn = page.locator('#mat-btn-walnut')
    const matteBlackBtn = page.locator('#mat-btn-matte-black')
    const chromeBtn = page.locator('#mat-btn-brushed-chrome')
    const glassBtn = page.locator('#mat-btn-glass')

    await expect(walnutBtn).toBeVisible()
    await expect(matteBlackBtn).toBeVisible()
    await expect(chromeBtn).toBeVisible()
    await expect(glassBtn).toBeVisible()

    // Click Matte Black
    await matteBlackBtn.click()
    await page.waitForTimeout(300)
    await expect(page.locator('#showroom-root')).toContainText('Material: Matte Black')

    // Click Brushed Chrome
    await chromeBtn.click()
    await page.waitForTimeout(300)
    await expect(page.locator('#showroom-root')).toContainText('Material: Brushed Chrome')

    // Click Glass
    await glassBtn.click()
    await page.waitForTimeout(300)
    await expect(page.locator('#showroom-root')).toContainText('Material: Glass')

    // Auto-rotate toggle
    const autoRotateBtn = page.locator('#showroom-autorotate-btn')
    await expect(autoRotateBtn).toContainText('Auto: ON')
    await autoRotateBtn.click()
    await expect(autoRotateBtn).toContainText('Auto: OFF')
    await autoRotateBtn.click()
    await expect(autoRotateBtn).toContainText('Auto: ON')
  })

  test('Real-time FPS counter displays 60 FPS • QA Verified', async ({ page }) => {
    await page.goto('/showroom')
    await page.waitForSelector('#showroom-fps-counter', { timeout: 15_000 })
    const fpsBadge = page.locator('#showroom-fps-counter')
    await expect(fpsBadge).toBeVisible()
    await expect(fpsBadge).toContainText(/FPS/)
    await expect(fpsBadge).toContainText('QA Verified')
  })

  test('Embed in Your Store CTA links to WhatsApp with inquiry message', async ({ page }) => {
    await page.goto('/showroom')
    await page.waitForSelector('#showroom-embed-cta', { timeout: 15_000 })
    const cta = page.locator('#showroom-embed-cta')
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', /wa\.me\/917875417830/)
    await expect(cta).toHaveAttribute('href', /interactive%203D%20models/)
  })

  test('Back to NORD button returns to landing page', async ({ page }) => {
    await page.goto('/showroom')
    await page.waitForSelector('#showroom-back-btn', { timeout: 15_000 })
    await page.locator('#showroom-back-btn').click()
    await expect(page).toHaveURL(/\/(#.*)?$/)
    await expect(page.locator('#hero')).toBeVisible()
  })

  test('Backdrop theme switcher toggles cyclorama presets', async ({ page }) => {
    await page.goto('/showroom')
    await page.waitForSelector('#showroom-backdrop-selector', { timeout: 15_000 })
    const auroraBtn = page.locator('#backdrop-aurora')
    await expect(auroraBtn).toBeVisible()
    await auroraBtn.click()
    await page.waitForTimeout(300)
    await expect(page.locator('#showroom-root')).toContainText('Cyber Aurora')

    const warmBtn = page.locator('#backdrop-warm')
    await warmBtn.click()
    await page.waitForTimeout(300)
    await expect(page.locator('#showroom-root')).toContainText('Warm Gallery')
  })
})
