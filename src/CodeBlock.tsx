import * as acorn from "acorn";
import jsx from "acorn-jsx";

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\(/g, "&#40;")
    .replace(/\)/g, "&#41;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
};

interface IProps {
  codeString: string;
  highlightKeywords?: { text: string; style: string }[];
  excludeKeywords?: string[];
}

interface IHighlight {
  start: number;
  end: number;
  name: string;
  style: string;
}

const CodeHighlighter = ({
  codeString,
  highlightKeywords = [],
  excludeKeywords = [],
}: IProps) => {
  const highlightCode = (code: string) => {
    const ast = acorn.Parser.extend(jsx()).parse(code, {
      ecmaVersion: 2020,
      sourceType: "module",
      locations: true,
    });

    const highlights: IHighlight[] = [];

    const walk = (node: acorn.Program) => {
      if (node.type === "Identifier") {
        const keyword = highlightKeywords.find((kw) => kw.text === node.name);
        if (keyword && !excludeKeywords.includes(node.name)) {
          highlights.push({
            start: node.start,
            end: node.end,
            name: node.name,
            style: keyword.style,
          });
        }
      } else if (node.type === "JSXAttribute") {
        const attrName = node.name.name;
        const attrValue =
          node.value && node.value.expression && node.value.expression.name;
        if (attrValue) {
          const text = `${attrName}={${attrValue}}`;
          const keyword = highlightKeywords.find((kw) => kw.text === text);
          if (keyword && !excludeKeywords.includes(text)) {
            highlights.push({
              start: node.start,
              end: node.end,
              name: text,
              style: keyword.style,
            });
          }
        }
      }

      for (const key in node) {
        if (node[key] && typeof node[key] === "object") {
          walk(node[key]);
        }
      }
    };

    walk(ast);

    let highlightedCode = "";
    let lastIndex = 0;

    highlights
      .sort((a, b) => a.start - b.start)
      .forEach(({ start, end, name, style }) => {
        highlightedCode += escapeHtml(code.slice(lastIndex, start));
        highlightedCode += `<mark style="${style}">${escapeHtml(name)}</mark>`;
        lastIndex = end;
      });

    highlightedCode += escapeHtml(code.slice(lastIndex));

    return highlightedCode;
  };

  const highlightedCode = highlightCode(codeString);

  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

export default CodeHighlighter;
