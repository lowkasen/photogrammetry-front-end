import Link from "next/link";

export function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h1>AWS RealityStation Asset Studio</h1>
      </div>

      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/upload/images">
        <a>Upload Images</a>
      </Link>
      <Link href="/upload/video">
        <a>Upload Video</a>
      </Link>
    </nav>
  );
}

// <nav className="flex flex-row w-screen h-14 justify-center bg-slate-400 shadow-lg">
//       <div className="flex max-w-6xl w-5/6 justify-between border-2">
//         <div className="flex flex-col items-left border-2 border-red-500">
//           <strong>AWS RealityStation</strong>
//           <span>Asset Studio</span>
//         </div>
//         <div className="flex flex-row border-2 border-green-300">
//           {tabs.map((tab) => (
//             <div className="flex items-center mx-5 border-2 border-black">
//               {tab}
//             </div>
//           ))}
//         </div>
//       </div>
//     </nav>

// <nav className="shadow-sm w-full">
//     <div className="w-full">
//       <div className="flex items-center h-20 w-full">
//         <h1 className="">AWS RealityStation Asset Studio</h1>
//       </div>
//     </div>

//     <Link href="/">
//       <a>Home</a>
//     </Link>
//     <Link href="/upload/images">
//       <a>Upload Images</a>
//     </Link>
//     <Link href="/upload/video">
//       <a>Upload Video</a>
//     </Link>
//   </nav>
