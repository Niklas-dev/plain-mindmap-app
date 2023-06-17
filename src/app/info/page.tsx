"use client";
import React, { useState } from "react";
import { clearTimeout } from "timers";

export default function Page() {
  const [copied, setCopied] = useState(false);
  const text = `You are now working in an app that is creating points for a mindmap
    and also connect them. This is the scheme I need:
    [
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
    ]
    This example is for a mindmap about water. In the label, you will put
    the content of the box, and source and target represent the
    connections between the points. Make sure to use a correct position in
    x and y. Return the output as a JSON string so I can load it in JS.
    Just return the output. Make sure that the first set of items is
    connected to an initial item that contains the topic. Use reasonable
    connection between the items. Use correct terms. The given object is
    just showing how is should be formated I will give you a topic next.`;
  return (
    <div className=" px-12 pt-8 w-full h-screen bg-gray-100 rounded-sm flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Info</h1>
      <h3 className="text-lg ">
        You can copy this layout and paste it to chat gpt.
      </h3>

      <div>
        <h4 className="text-lg font-semibold">Worflow</h4>
        <ul className="list-decimal pl-8">
          <li>Copy layout</li>
          <li>Paste into Chat gpt</li>
          <li>Enter your topic</li>
          <li>Copy the array from the code</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2   rounded-md ">
        <code className=" p-2 border-gray-300 bg-white rounded-md border-2 w-full md:w-2/3">
          {text}
        </code>

        <button
          onClick={() => {
            navigator.clipboard.writeText("");
            setCopied(true);
            setTimeout((out: NodeJS.Timeout) => {
              setCopied(false);
              clearTimeout(out);
            }, 2000);
          }}
          className=" bg-gray-300 mb-4 py-2 px-2 sm:px-4 rounded-lg flex-grow-0 transition-transform hover:scale-95 w-fit min-w-[11rem]"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
    </div>
  );
}
