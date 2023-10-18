"use client";
import { updateProfileImage } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { getUserInitials } from "@/libs/utils";
import { useUploadThing } from "@/utils/uploadthing";
import { LoaderIcon } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileImage({ session }: { session: Session }) {
    const [loading, setLoading] = useState<boolean>(false);
    const { startUpload } = useUploadThing("imageUploader", {
        onUploadBegin: () => {
            setLoading(true);
            toast({ description: "upload began" });
        },
        onClientUploadComplete: async (res) => {
            if (!res) throw new Error("image upload failed.");

            await updateProfileImage({
                userId: session.user.id,
                imgUrl: res[0].url,
            });

            await update();
            toast({
                description: "Finished updating user record",
            });
            setLoading(false);
            router.refresh();
        },
    });
    const { update } = useSession();
    const router = useRouter();

    return (
        <div className="space-y-6">
            {session.user.image && (
                <Avatar className="h-32 w-32 relative">
                    {loading === true && (
                        <LoaderIcon className="absolute text-accent-foreground w-10 h-10 animate-spin  top-[34%] left-[34%]" />
                    )}
                    <AvatarImage src={session.user?.image ?? ""} />

                    <AvatarFallback>
                        {getUserInitials(session.user?.name ?? "")}
                    </AvatarFallback>
                </Avatar>
            )}

            <label
                className="text-sm cursor-pointer text-accent-foreground"
                htmlFor="img-upload"
            >
                Edit Img
            </label>

            <input
                type="file"
                id="img-upload"
                className="hidden"
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    await startUpload([file]);
                }}
            />

            {/* <UploadButton
                onUploadBegin={() => toast({ description: "upload began" })}
                onClientUploadComplete={async (res) => {
                    if (!res) throw new Error("failed to upload image");

                    await updateProfileImage({
                        userId: session.user.id,
                        imgUrl: res[0].url,
                    });

                    await update();
                    toast({
                        description: "Finished updating user record",
                    });
                    router.refresh();
                }}
                endpoint="imageUploader"
            /> */}
        </div>
    );
}
