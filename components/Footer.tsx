import Link from "next/link";

export default function Footer() {
    return (
      <footer className="w-full py-4 px-4 text-sm text-muted-foreground border-t bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-between gap-2 md:flex-row">
          <p>&copy; 2025 ZDSPDGC. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact Support
            </Link>
          </nav>
        </div>
      </footer>
    );
  }
  
