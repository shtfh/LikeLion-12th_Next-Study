"use client"

import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import { notFound, useRouter } from "next/navigation";




export default function InterceptedImagePage({ params }) {
    const router = useRouter()

    const newsItemSlug = params.slug;
    const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);


    if (!newsItem) {
      notFound();
    }
  
    return (
        <>
            <div className="modal-backdrop" onClick={router.back} />
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/image/news/${newsItem.image}`} alt="{newsItem.}"></img>
                </div>
            </dialog>
            
        </>
      );
  } 

//   4:17