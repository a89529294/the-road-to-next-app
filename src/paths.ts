export function homePath() {
  return "/";
}

export function ticketsPath() {
  return "/tickets";
}

export function ticketPath(ticketId: string) {
  return `/tickets/${ticketId}`;
}
