const colors = [
  "#F87171", // Red
  "#FBBF24", // Yellow
  "#34D399", // Green
  "#60A5FA", // Blue
  "#A78BFA", // Purple
  "#F472B6", // Pink
];

export function generateUserId() {
  return `user-${Math.random().toString(36).substring(2, 15)}`;
}

export function getColorFromIdentity(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
