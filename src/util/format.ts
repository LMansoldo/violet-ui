import { formatCurrency } from '../ui/utils'
import { parseFromCents } from './parse'

export function formatCurrencyFromCents(
	value: number | undefined | null,
	locale?: Intl.LocalesArgument,
	options?: Intl.NumberFormatOptions
): string {
	return formatCurrency(parseFromCents(value), locale, options)
}

export function formatUUID(uuid: string) {
	const unformatted = unformatUUID(uuid)
	if (unformatted.length === 32) {
		const arr = [
			unformatted.substring(0, 8),
			unformatted.substring(8, 12),
			unformatted.substring(12, 16),
			unformatted.substring(16, 20),
			unformatted.substring(20, 32),
		]
		return arr.join('-')
	}
	throw new Error(
		`The value "${unformatted}" is not parseable to UUID (32 length string is required)`
	)
}

export function unformatUUID(uuid: string) {
	return uuid.replace(/-/g, '')
}
