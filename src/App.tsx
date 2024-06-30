import "./App.css";
import CodeBlock from "./CodeBlock";
import ParentComponent from "./parent";

const code = `
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
      <div className="container mx-auto mt-4 flex flex-col items-center">
        <h1 className="mb-4">parent component</h1>
        <div className="flex gap-4">
          <Button onClick={callChildMethod}>Call Child Method</Button>
          <Button onClick={focusChildInput}>Focus Child Input</Button>
        </div>
      </div>
      <ChildComponent ref={childRef} />
    </div>
  );
};
`;

const code1 = `
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
`;

const highlightKeywords = [
  { text: "useImperativeHandle", style: "" },
  { text: "forwardRef", style: "" },
  { text: "ref={localRef}", style: "" },
  { text: "someMethod", style: "" },
  { text: "focus", style: "" },
];

const exclusions = ["focusChildInput"];

function App() {
  return (
    <div className="">
      <ParentComponent />
      <div className="container mx-auto flex">
        <CodeBlock codeString={code} highlightKeywords={highlightKeywords} />
        <CodeBlock codeString={code1} highlightKeywords={highlightKeywords} />
      </div>
    </div>
  );
}

export default App;
