'use client'
import React, { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import { ClearOutlined, EditOutlined, FileOutlined } from "@ant-design/icons";

export default function DrawingBoard() {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState<any>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  return (
    <div className="w-[800px] h-[600px] border border-spacing-2 rounded-sm p-5 flex flex-col gap-2">
      <div className="flex flex-row gap-3">
        <EditOutlined onClick={() => setTool('pen')} />
        <ClearOutlined onClick={() => setTool('eraser')}/>
        <FileOutlined onClick={() => setLines([])}/>
      </div>
      <Stage
        width={600}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="cursor-crosshair"
      >
        <Layer>
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke={'#000'}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
