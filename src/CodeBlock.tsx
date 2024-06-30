export interface IProps {
  code: string;
  highlights: Array<{ text: string; style: string }>;
  title?: string;
  exclusions?: string[];
}

const CodeBlock = ({ code, highlights, title, exclusions }: IProps) => {
  const escapeHtml = (str) => {
    return str
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

  const isBoundary = (char) => {
    return !char || /\s|[.,;(){}[\]]/.test(char);
  };

  const highlightCode = (code) => {
    const escapedCode = escapeHtml(code);
    let result = "";
    let i = 0;

    while (i < escapedCode.length) {
      let matched = false;

      for (const { text, style } of highlights) {
        const escapedText = escapeHtml(text);
        const end = i + escapedText.length;

        if (
          escapedCode.substring(i, end) === escapedText &&
          isBoundary(escapedCode[i - 1]) &&
          isBoundary(escapedCode[end])
        ) {
          const context = escapedCode.substring(i - 20, end + 20); // Check larger context for exclusions
          const isExcluded = exclusions.some((exclusion) => {
            const escapedExclusion = escapeHtml(exclusion);
            return context.includes(escapedExclusion);
          });

          if (!isExcluded) {
            result += `<mark style="${style}">${escapedText}</mark>`;
            i = end;
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        result += escapedCode[i];
        i++;
      }
    }

    return result;
  };

  return (
    <div className="flex-1">
      {title && <h1>{title}</h1>}
      <pre className="pl-[45px] leading-none">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
