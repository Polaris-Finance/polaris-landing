import { GithubIcon, TelegramIcon } from "@/components/icons";
import { basePath } from "@/lib/basePath";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <Link href="/">
            <Image
              src={`${basePath}/full-logo.svg`}
              alt="Polaris"
              width={126}
              height={44}
              className="footer__logo"
            />
          </Link>
        </div>

        <div className="footer__links">
          <div className="footer__nav">
            <Link href="/blog" className="footer__link">
              Blog
            </Link>
            <a
              href="https://x.com/polarisfinance_"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>
            <a
              href="https://github.com/Polaris-Finance"
              className="footer__link footer__link--icon"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://t.me/polaris_ann"
              className="footer__link footer__link--icon"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <TelegramIcon className="h-4 w-4" />
            </a>
          </div>
          <a href="mailto:hello@polarisfinance.io" className="footer__email">
            hello@polarisfinance.io
          </a>
        </div>
      </div>
    </footer>
  );
}
