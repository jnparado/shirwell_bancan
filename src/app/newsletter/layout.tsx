import { SwgBasicScript } from "@/components/subscriptions/swg-basic-script";

/** SwG CMS sync snippet on all newsletter / published article routes. */
export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SwgBasicScript lang="en-AU" theme="light" />
      {children}
    </>
  );
}
