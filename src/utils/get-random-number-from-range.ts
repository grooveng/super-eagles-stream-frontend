export default function getRandomNumberFromRange(
	gteq: number,
	lt: number,
): number {
	return gteq + Math.random() * (lt - gteq);
}
