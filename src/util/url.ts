export function validateUrl(
	next: string | null,
	origin: string
): next is string {
	if (next) {
		const url = new URL(next, origin)
		return url.origin === origin
	}
	return false
}
