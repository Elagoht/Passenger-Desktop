import Window from "@/components/layout/Window"
import Detective from "@/components/windows/Detective"

const WinDetective = () => {
  return <Window compact>
    <h1 className="text-2xl font-bold text-center">
      Detective
    </h1>

    <Detective />
  </Window>
}

export default WinDetective
