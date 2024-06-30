import ChildComponent from "./ChildComponent";
import Button from "./button";
import { useRef } from "react";

const ParentComponent = () => {
  const childRef = useRef();

  const callChildMethod = () => {
    if (childRef.current) {
      childRef.current.someMethod();
    }
  };

  const focusChildInput = () => {
    if (childRef.current) {
      childRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col bg-slate-200">
      <div className="mt-4">
        <h1>parent component</h1>
        <Button onClick={callChildMethod}>Call Child Method</Button>
        <Button onClick={focusChildInput}>Focus Child Input</Button>
      </div>
      <ChildComponent ref={childRef} />
    </div>
  );
};

export default ParentComponent;
