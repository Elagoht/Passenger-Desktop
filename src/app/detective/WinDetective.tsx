import Window from "@/components/layout/Window"
import Detective from "@/components/windows/Detective"

const WinDetective = () => {
  return <Window
    title="Detective"
    description="Detective is your personal assistant to help you find potential security issues in your vault."
  >
    <Detective />
  </Window>
}

export default WinDetective
