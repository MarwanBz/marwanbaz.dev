/* THIS FILE IS OWNED BY PAYLOAD — mounts the admin panel at /admin. */

import { RootPage } from "@payloadcms/next/views";

import config from "@payload-config";
import { importMap } from "../../importMap.js";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params, searchParams });

export default Page;
