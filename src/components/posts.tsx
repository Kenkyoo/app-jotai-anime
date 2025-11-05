import { Suspense } from "react";
import { a, useSpring } from "@react-spring/web";
import Parser from "html-react-parser";
import { atom, useAtom, useSetAtom } from "jotai";

type PostData = {
  url?: string;
  favorites: number;
  image_id: number;
  uploaded_at: string;
  source: string;
  dominant_color: string;
  byte_size: number;
  signature: string;
  artist: {
    name: string;
  };
};

const postId = atom(100);
const postData = atom(async (get) => {
  const id = get(postId);
  const response = await fetch(`https://api.waifu.im/search?id=${id}`);
  const data = await response.json();
  const image = data.images[0];
  return image;
});

function Id() {
  const [id] = useAtom(postId);
  const props = useSpring({ from: { id }, id, reset: true });
  return <a.h1>{props.id.to(Math.round)}</a.h1>;
}

function Next() {
  // Use `useSetAtom` to avoid re-render
  // const [, setPostId] = useAtom(postId)
  const setPostId = useSetAtom(postId);
  return (
    <button
      onClick={() => setPostId((id) => id + 1)}
      className="btn btn-primary"
    >
      Next
    </button>
  );
}

function PostTitle() {
  const [
    {
      image_id,
      url,
      uploaded_at,
      favorites,
      source,
      artist,
      dominant_color,
      byte_size,
      signature,
    },
  ] = useAtom(postData);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{artist.name}</h1>
          {source && <p className="mb-5">{Parser(source)}</p>}
          <h6>{new Date(uploaded_at * 1000).toLocaleDateString("en-US")}</h6>
          <div
            className="card w-96 shadow-sm"
            style={{
              backgroundColor: dominant_color,
            }}
          >
            <figure>
              <img src={url} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {}
                <div className="badge badge-secondary">{image_id}</div>
              </h2>
              <p>{signature}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{favorites}</div>
                <div className="badge badge-outline">{byte_size}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Posts() {
  return (
    <>
      <Id />
      <div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <PostTitle />
        </Suspense>
      </div>
      <Next />
    </>
  );
}
