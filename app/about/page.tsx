import { redirect } from "next/navigation";

// The "About" story lives on the home page; keep old /about links working.
export default function AboutPage() {
  redirect("/#about");
}
