import { useLayoutEffect, useRef } from "react";

export type FakeSpanProps = {
  textValue: string;
  setFakeSpanDomWidth: (width: string) => void;
};

function FakeSpan({ textValue, setFakeSpanDomWidth }: FakeSpanProps) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const newWidth = getComputedStyle(ref.current).width;
      setFakeSpanDomWidth(newWidth);
    }
  }, [textValue]);

  return (
    <span ref={ref} className="invisible absolute whitespace-pre">
      {textValue}
    </span>
  );
}

export default FakeSpan;
