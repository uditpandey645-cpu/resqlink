import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  x: number;
  y: number;
  active: boolean;
}

interface Connection {
  from: string;
  to: string;
}

export function MeshNetworkVisual() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", x: 50, y: 30, active: true },
    { id: "2", x: 25, y: 60, active: true },
    { id: "3", x: 75, y: 55, active: true },
    { id: "4", x: 40, y: 80, active: false },
    { id: "5", x: 65, y: 85, active: true },
    { id: "6", x: 15, y: 35, active: true },
  ]);

  const connections: Connection[] = [
    { from: "1", to: "2" },
    { from: "1", to: "3" },
    { from: "2", to: "4" },
    { from: "3", to: "5" },
    { from: "2", to: "6" },
    { from: "4", to: "5" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          active: Math.random() > 0.2,
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getNodePos = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto mesh-animate">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* Connections */}
        {connections.map((conn, i) => {
          const from = getNodePos(conn.from);
          const to = getNodePos(conn.to);
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          const isActive = fromNode?.active && toNode?.active;

          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isActive ? "hsl(var(--safe))" : "hsl(var(--muted))"}
              strokeWidth="0.5"
              strokeDasharray={isActive ? "none" : "2 2"}
              className="transition-all duration-500"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Glow effect */}
            {node.active && (
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill="none"
                stroke="hsl(var(--safe))"
                strokeWidth="0.5"
                opacity="0.3"
                className="animate-pulse"
              />
            )}
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill={node.active ? "hsl(var(--safe))" : "hsl(var(--muted))"}
              className="transition-all duration-300"
            />
            {/* Inner dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r="1.5"
              fill={node.active ? "hsl(var(--background))" : "hsl(var(--muted-foreground))"}
            />
          </g>
        ))}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass rounded-xl px-3 py-1.5">
          <p className="text-xs font-medium text-safe">Mesh Active</p>
        </div>
      </div>
    </div>
  );
}
