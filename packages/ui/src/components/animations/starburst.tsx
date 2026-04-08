/* eslint-disable no-inline-styles */
import { NodeGroup } from "react-move";
import { Star } from "../atoms/Star";

type StarDefinition = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

type Props = {
  stars: StarDefinition[];
};

function StarBurst({ stars }: Props) {
  const starClassName = `w-8 h-8 text-yellow-500
    drop-shadow-[0_0_6px_rgba(254,222,39,0.9)]
    drop-shadow-[0_0_12px_rgba(254,190,27,0.6)]`;
  return (
    <NodeGroup
      data={stars}
      keyAccessor={(s) => s.id}
      start={() => ({ y: 0, x: 0 })}
      enter={() => ({
        y: [-32],
        x: [Math.random() * 20 - 10],
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
                left: data.x + (state.x ?? 0),
                top: data.y + state.y,
                transform: `translate(-50%,0) rotate(${data.rotation}deg) scale(${data.scale})`,
                opacity: 0.8 - Math.abs(state.y) / 40,
              }}
            >
              <Star className={starClassName} />
            </span>
          ))}
        </div>
      )}
    </NodeGroup>
  );
}

export default StarBurst;
