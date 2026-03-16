import { format, isValid, parseISO } from "date-fns";

export function formatDateLabel(value: string, pattern = "MMMM d, yyyy") {
  const parsed = parseISO(value);
  if (isValid(parsed)) {
    return format(parsed, pattern);
  }

  const fallback = new Date(value);
  if (isValid(fallback)) {
    return format(fallback, pattern);
  }

  return value;
}

export function toValidDate(value?: string | null) {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(value);
  return isValid(parsed) ? parsed : new Date();
}
