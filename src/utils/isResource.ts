export default function isResource(resource: string): boolean {
  try {
    return Boolean(new URL(resource))
  } catch {
    return false
  }
}
