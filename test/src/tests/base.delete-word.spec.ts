import { expect, test } from '@playwright/test'
import { modifier } from './util/modifier'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3039/base')
})

test.describe('Delete words', () => {
  test('should backspace previous word (even if there is not a selected character)', async ({ page }) => {
    const input = page.getByTestId('otp-input-wrapper').getByRole('textbox')

    await input.pressSequentially('1234')
    await expect(input).toHaveValue('1234')

    await input.press(`${modifier}+Backspace`)
    await expect(input).toHaveValue('')
  })
  test('should backspace previous word (including selected character)', async ({ page }) => {
    const input = page.getByTestId('otp-input-wrapper').getByRole('textbox')

    await input.pressSequentially('123456')
    await expect(input).toHaveValue('123456')

    await input.press('ArrowLeft')
    await input.press('ArrowLeft')
    await input.press(`${modifier}+Backspace`)

    await expect(input).toHaveValue('56')
  })
  test('should forward-delete character when pressing delete', async ({ page }) => {
    const input = page.getByTestId('otp-input-wrapper').getByRole('textbox')

    await input.pressSequentially('123456')
    await expect(input).toHaveValue('123456')

    await input.press('Delete')
    await expect(input).toHaveValue('12345')
    await input.press('ArrowLeft')
    await input.press('ArrowLeft')
    await input.press('ArrowLeft')
    await input.press('ArrowLeft')
    await input.press('ArrowLeft')
    await input.press('Delete')
    await expect(input).toHaveValue('2345')
    await input.press('ArrowRight')
    await input.press('ArrowRight')
    await input.press('Delete')
    await expect(input).toHaveValue('235')
  })
})
