import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <p className="text-center text-sm text-muted">{profile.footer}</p>
      </div>
    </footer>
  );
}
