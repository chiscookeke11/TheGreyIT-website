"use client";

import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanityClient";
import Image from "next/image";

const url = imageUrlBuilder(client);
const imgUrl = (src) => url.image(src).width(1200).auto("format").url();

const PullQuote = ({ value }) => (
  <blockquote className="pull-quote">
    <p>{value.text}</p>
    {value.attribution && <cite>{value.attribution}</cite>}
  </blockquote>
);

const Callout = ({ value }) => (
  <div className={`callout callout--${value.type ?? "info"}`}>
    <p>{value.text}</p>
  </div>
);

const Figure = ({ value }) => (
  <figure className={`figure figure--${value.size ?? "normal"}`}>
    <Image
      src={imgUrl(value.image)}
      alt={value.alt ?? ""}
      width={1200}
      height={675}
    />
    {value.caption && <figcaption>{value.caption}</figcaption>}
  </figure>
);

const components = {
  types: {
    pullQuote: PullQuote,
    callout: Callout,
    figure: Figure,
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export default function PortableTextRenderer({ value }) {
  if (!value) return null;

  if (typeof value === "string") {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: value }} />
    );
  }

  return (
    <div className="prose text-black ">
      <PortableText value={value} components={components} />
    </div>
  );
}
