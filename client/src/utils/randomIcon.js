const icons = ["💖", "⭐", "🚀", "😜", "🌹", "💕", "✨"];

export default function randomIcon() {
  return icons[parseInt(Math.floor(Math.random() * 7))];
}