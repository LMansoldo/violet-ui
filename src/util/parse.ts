export function parseFromCents(value: number): number
export function parseFromCents(value: number | undefined): number | undefined
export function parseFromCents(
	value: number | undefined | null
): number | undefined | null
export function parseFromCents(value: number | undefined | null) {
	if (typeof value === 'number') return value / 100
	return value
}

export function parseToCents(value: number): number
export function parseToCents(value: number | undefined): number | undefined
export function parseToCents(
	value: number | undefined | null
): number | undefined | null
export function parseToCents(value: number | undefined | null) {
	if (typeof value === 'number') return Math.round(value * 100)
}
