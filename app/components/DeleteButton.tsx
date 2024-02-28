"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteImage = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
    return res;
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("Post deleted");
        const post = await res.json();
        const { publicId } = post;
        await deleteImage(publicId);
        toast.dismiss();
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleDelete = () => {
    toast.warning(
      <div className="flex flex-col gap-4">
        <span>Are you sure you want to delete this post?</span>
        <div className="flex items-center justify-center gap-2">
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>

          <button
            className="rounded-md bg-slate-400 px-4 py-2 text-white"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
      },
    );
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
