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
import Link from "next/link";

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions: DefaultEdgeOptions = {};

const NodeAsHandleFlow = () => {
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges([
    {
      id: 1,
      label: "Water",
      x: 0,
      y: 0,
      source: "",
      target: "",
    },
    {
      id: 2,
      label: "Properties",
      x: -200,
      y: -100,
      source: "2",
      target: "1",
    },
    {
      id: 3,
      label: "States",
      x: 200,
      y: -100,
      source: "3",
      target: "1",
    },
    {
      id: 4,
      label: "Importance",
      x: -200,
      y: 100,
      source: "4",
      target: "1",
    },
    {
      id: 5,
      label: "Uses",
      x: 200,
      y: 100,
      source: "5",
      target: "1",
    },
  ]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [jsonString, setJsonString] = useState("");

  const createMindmap = (json: string) => {
    try {
      const jsonData = JSON.parse(json);
      console.log(jsonData);
      const { nodes, edges } = createNodesAndEdges(jsonData);
      setEdges(edges);

      setNodes(nodes);
    } catch (err) {
      alert("Enter a correct array");
    }
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
          placeholder="Dont know what to enter? Check bottom left."
          value={jsonString}
          onChange={(e) => setJsonString(e.target.value)}
          className="border-[1px] py-2 border-gray-400 rounded-lg outline-none px-2 flex-grow max-w-[61%] sm:max-w-none"
        ></input>
        <div className="flex flex-row gap-2">
          <button
            onClick={() => createMindmap(jsonString)}
            className=" bg-gray-200 py-2 px-2 sm:px-4 rounded-lg flex-grow-0 transition-transform hover:scale-95"
          >
            Submit
          </button>
          <button
            onClick={() => {
              setJsonString("");
              setNodes([]);
              setEdges([]);
            }}
            className=" bg-gray-200 py-2 px-2 sm:px-4 rounded-lg flex-grow-0 transition-transform hover:scale-95"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-2 bg-gray-200 rounded-tr-lg z-10">
        <Link href="/info">Get Chat GPT Layout</Link>
      </div>
      <div className="h-full w-full ">
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
