"use client";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function OnSubmit({text}) {
  const { pending } = useFormStatus();
  const pathname = usePathname();
  function hideModal() {
    window.location.href = pathname;
  }
  return (
    <button onClick={hideModal} disabled={pending}>
      {pending ? "submitting" : text}
    </button>
  );
}
