"use client";

import { createNodesAndEdges } from "@/utils";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  EdgeTypes,
  DefaultEdgeOptions,
} from "reactflow";
import "reactflow/dist/style.css";
import FloatingEdge from "./components/FloatingEdge";
import FloatingConnectionLine from "./components/FloatingConnectionLine";

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions: DefaultEdgeOptions = {};

const NodeAsHandleFlow = () => {
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges([
    {
      id: 1,
      label: "Hunt: Showdown",
      x: 0,
      y: 0,
      source: "",
      target: "",
    },
    {
      id: 2,
      label: "Genre",
      x: -200,
      y: -100,
      source: "2",
      target: "1",
    },
    {
      id: 3,
      label: "Setting",
      x: 200,
      y: -100,
      source: "3",
      target: "1",
    },
    {
      id: 4,
      label: "Game Modes",
      x: -200,
      y: 100,
      source: "4",
      target: "1",
    },
    {
      id: 5,
      label: "Gameplay Mechanics",
      x: 200,
      y: 100,
      source: "5",
      target: "1",
    },
    {
      id: 6,
      label: "First-person Shooter",
      x: -350,
      y: -220,
      source: "6",
      target: "2",
    },
    {
      id: 7,
      label: "Horror",
      x: -350,
      y: -60,
      source: "7",
      target: "2",
    },
    {
      id: 8,
      label: "19th Century",
      x: 350,
      y: -220,
      source: "8",
      target: "3",
    },
    {
      id: 9,
      label: "Bounty Hunting",
      x: 350,
      y: -60,
      source: "9",
      target: "3",
    },
    {
      id: 10,
      label: "PvPvE",
      x: 350,
      y: 100,
      source: "10",
      target: "4",
    },
  ]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [jsonString, setJsonString] = useState("");

  const createMindmap = (json: string) => {
    const jsonData = JSON.parse(json);
    console.log(jsonData);

    const { nodes, edges } = createNodesAndEdges(jsonData);

    setEdges(edges);

    setNodes(nodes);
  };

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: any) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="w-screen h-screen">
      <div className="  flex flex-row sm:gap-4 fixed z-10 p-4 bg-white shadow-md w-full justify-between gap-2">
        <input
          value={jsonString}
          onChange={(e) => setJsonString(e.target.value)}
          className="border-[1px] py-2 border-gray-400 rounded-lg outline-none px-2 flex-grow"
        ></input>
        <div className="flex flex-row gap-2">
          <button
            onClick={() => createMindmap(jsonString)}
            className=" bg-gray-200 py-2 px-2 sm:px-4 rounded-lg flex-grow-0 transition-transform hover:scale-95"
          >
            Submit
          </button>
          <button
            onClick={() => setJsonString("")}
            className=" bg-gray-200 py-2 px-2 sm:px-4 rounded-lg flex-grow-0 transition-transform hover:scale-95"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="h-full w-full">
        <ReactFlow
          defaultEdgeOptions={defaultEdgeOptions}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          edgeTypes={edgeTypes as EdgeTypes}
          connectionLineComponent={FloatingConnectionLine}
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default NodeAsHandleFlow;
