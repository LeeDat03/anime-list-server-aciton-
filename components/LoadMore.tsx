"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";
import { data } from "@/app/_data";

let page = 2;

export type AnimateCard = JSX.Element;

function LoadMore() {
  const [data, setData] = useState<AnimateCard[]>([]);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
