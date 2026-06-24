import { useEffect, useState } from "react";

/** Multi-phrase typing effect. */
export function TypingText({ phrases, typingSpeed = 70, deletingSpeed = 40, pauseMs = 1800 }) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const current = phrases[phraseIdx % phrases.length];

    let timeout;
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIdx((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1),
          );
        },
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span data-testid="typing-text" className="typing-cursor text-cyan-400">
      {text}
    </span>
  );
}
