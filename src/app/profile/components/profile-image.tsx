"use client";
import { updateProfileImage } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { getUserInitials } from "@/libs/utils";
import { UploadButton } from "@/utils/uploadthing";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileImage({ session }: { session: Session }) {
    const { update } = useSession();
    const router = useRouter();

    return (
        <div>
            {session.user.image && (
                <Avatar className="h-32 w-32">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback>
                        {getUserInitials(session.user?.name ?? "")}
                    </AvatarFallback>
                </Avatar>
            )}
            <UploadButton
                onUploadBegin={() => toast({ description: "upload began" })}
                onClientUploadComplete={async (res) => {
                    if (!res) throw new Error("failed to upload image");

                    await updateProfileImage({
                        userId: session.user.id,
                        imgUrl: res[0].url,
                    });

                    await update();
                    router.refresh();
                    toast({
                        description: "Finished updating user record",
                    });
                }}
                endpoint="imageUploader"
            />
        </div>
    );
}
