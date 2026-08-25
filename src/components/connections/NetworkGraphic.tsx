/**
 * The constellation of nodes and threads that sits behind the parchment band.
 * Points are hand-placed rather than generated so the server and client render
 * the same markup.
 */
const NODES = [
  { x: 40, y: 118 }, { x: 132, y: 62 }, { x: 214, y: 150 },
  { x: 296, y: 40 }, { x: 352, y: 128 }, { x: 440, y: 78 },
  { x: 508, y: 160 }, { x: 596, y: 52 }, { x: 664, y: 132 },
  { x: 744, y: 68 }, { x: 812, y: 152 }, { x: 900, y: 46 },
  { x: 962, y: 124 }, { x: 1048, y: 74 }, { x: 1120, y: 158 },
  { x: 1204, y: 56 }, { x: 1272, y: 136 }, { x: 1360, y: 88 },
];

/** Index pairs joined by a thread. */
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
  [15, 16], [16, 17], [0, 2], [1, 4], [3, 5], [4, 6], [5, 8], [7, 9],
  [8, 10], [9, 12], [11, 13], [12, 14], [13, 16], [15, 17],
];

export default function NetworkGraphic({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1400 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <g stroke="#0c544c" strokeWidth="1" opacity="0.28">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>
      <g fill="#0c544c" opacity="0.42">
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 9 : 6} />
        ))}
      </g>
    </svg>
  );
}
