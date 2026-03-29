import { NodeGroup } from "react-move"

type Star = {
  id: number
  x: number
  y: number
}

type Props = {
  stars: Star[]
}

export default function StarBurst({ stars }: Props) {
  return (
    <NodeGroup
      data={stars}
      keyAccessor={(s) => s.id}
      start={() => ({ y: 0 })}
      enter={() => ({
        y: [-32],
        opacity: [0],
        timing: { duration: 600 },
      })}
    >
      {(nodes) => (
        <div className="pointer-events-none fixed top-0 left-0 h-screen w-screen">
          {nodes.map(({ key, data, state }) => (
            <span
              key={key}
              style={{
                position: "absolute",
                left: data.x,
                top: data.y + state.y,
                transform: "translate(-50%,0)",
                opacity: 0.8 - Math.abs(state.y) / 40,
              }}
              className="text-xl font-bold text-yellow-400"
            >
              ✨
            </span>
          ))}
        </div>
      )}
    </NodeGroup>
  )
}
