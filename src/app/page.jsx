"use client"

import { useEffect, useRef } from "react"

const page = () => {
  const consoleInput = useRef();
  const historyContainer = useRef();

  useEffect(() => {
    function addResult(inputAsString, output) {
      const outputAsString = output instanceof Array ? `[${output.join(', ')}]` : output.toString();
      const inputLogElement = document.createElement("div")
      const outputLogElement = document.createElement("div")

      inputLogElement.classList.add("console-input-log")
      outputLogElement.classList.add("console-output-log")

      inputLogElement.textContent = `> ${inputAsString}`
      outputLogElement.textContent = outputAsString;

      historyContainer.current?.append(inputLogElement, outputLogElement)
    }

    consoleInput.current?.addEventListener("keyup",
      (e) => {
        const code = consoleInput.current?.value.trim();

        if (code?.length === 0) return;

        if (e.key === "Enter") {
          try {
            addResult(code, eval(code))
          } catch (err) {
            addResult(code, err)
          }

          consoleInput.current.value = "";
          historyContainer.current.scrollTop = historyContainer.current.scrollHeight;
        }
      }
    )

    addResult("1+2+3", 6);
  }, [])

  return (
    <div className="console">
      <div className="console-history" ref={historyContainer}>
        <div className="console-input-log"></div>
        <div className="console-output-log"></div>
      </div>

      <input
        type="text"
        autoFocus
        spellCheck="false"
        className="console-input"
        placeholder="Enter input..."
        ref={consoleInput}
      />
    </div>
  )
}

export default page