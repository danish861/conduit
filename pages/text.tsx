import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Test = () => {
  const router = useRouter();

  useEffect(() => {
    const onHashChangeStart = (url) => {
      console.log(`Path changing to ${url}`);
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  return (
    <>
      <Link href="/" legacyBehavior>
        <a>Link to #some-hash</a>
      </Link>
      <Link href="/#some-other-hash" legacyBehavior>
        <a>Link to #some-other-hash</a>
      </Link>
    </>
  );
};

export default Test;
