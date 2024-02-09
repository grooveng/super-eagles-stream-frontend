import DOMPurify from "isomorphic-dompurify";

type SanitaizedTextProps = {
  className: string;
  text: string;
};

export function SanitaizedText({ className, text }: SanitaizedTextProps) {
  const sanitized = DOMPurify.sanitize(text);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
