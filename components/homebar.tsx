import { useRouter } from "next/router";

export function Homebar() {
  const router = useRouter();

  return (
    <div>
      <div onClick={() => router.push("/")}>Home</div>
      <div onClick={() => router.push("/upload/images")}>Images</div>
      <div onClick={() => router.push("/upload/video")}>Videos</div>
    </div>
  );
}
