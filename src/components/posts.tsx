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

const postId = atom(1);
const postData = atom(async (get) => {
  const id = get(postId);
  const response = await fetch(`https://api.waifu.im/search?id=${id}`);
  const data = await response.json();
  const image = data.images[0];
  console.log(image)
  return image;
});

function Id() {
  const [id] = useAtom(postId);
  const props = useSpring({ from: { id }, id, reset: true });
  return (
     <a.h1 className="btn btn-ghost text-xl">{props.id.to(Math.round)}</a.h1>
    )
  
}

function Next() {
  // Use `useSetAtom` to avoid re-render
  // const [, setPostId] = useAtom(postId)
  const setPostId = useSetAtom(postId);
  return (
    <button
      onClick={() => setPostId((id) => id + 1)}
      className="btn btn-accent"
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
         <h1 className="mb-5 text-5xl font-bold">{artist ? artist.name : "art"}</h1>
          <h6>{new Date(uploaded_at).toLocaleDateString("es-AR")}</h6>
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
                ImageID
                <div className="badge badge-secondary">{image_id}</div>
              </h2>
              <a className="text-primary">Source: {Parser(source)}</a>
              <div className="card-actions justify-end">
                <div className="badge badge-accent">Favs: {favorites}</div>
                <div className="badge badge-secondary">Size: {byte_size}kb</div>
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
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><span> Page: <Id /></span></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Waifu app</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><span> Page: <Id /></span></li>
    </ul>
  </div>
  <div className="navbar-end me-5">
    <Next />
  </div>
</div>
      <div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <PostTitle />
        </Suspense>
      </div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Dev by Kenkyoo with 🩷 --- Copyright © {new Date().getFullYear()}</p>
        </aside>
      </footer>
    </>
  );
}
