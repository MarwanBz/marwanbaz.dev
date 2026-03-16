import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import Image from "next/image";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { MatrixRain } from "@/components/matrix-rain";
import { resolveMediaUrl } from "@/lib/cms/strapi";

function MdxImage(props: ComponentProps<"img">) {
  const { src = "", alt = "", ...rest } = props;

  return (
    <Image
      {...rest}
      src={resolveMediaUrl(src)}
      alt={alt}
      width={1200}
      height={630}
      sizes="100vw"
      unoptimized
      style={{ width: "100%", height: "auto" }}
      className="rounded-xl"
    />
  );
}

const mdxComponents = {
  MatrixRain,
  img: MdxImage,
};

export async function RemoteMdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["anchor"],
                },
              },
            ],
            [
              rehypePrettyCode,
              {
                theme: "github-dark",
              },
            ],
          ],
        },
      }}
    />
  );
}
