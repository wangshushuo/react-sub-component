import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const [a, setA] = useState(0);
  const localRef = useRef();

  useImperativeHandle(ref, () => ({
    someMethod() {
      setA(a + 1);
    },
    focus() {
      if (localRef.current) {
        localRef.current.focus();
      }
    },
  }));

  return (
    <div className="m-4 flex flex-col items-center">
      <h1 className="mb-4">child component</h1>
      <label htmlFor="" className="flex items-center border">
        <span className="px-2 leading-none">input:</span>
        <input
          ref={localRef}
          className="border-l"
          value={a}
          onChange={() => {}}
        />
      </label>
    </div>
  );
});

export default ChildComponent;
