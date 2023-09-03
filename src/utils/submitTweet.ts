"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Tweetschema } from "@/validationSchema/tweet";
import { type } from "os";
import { isReadable } from "stream";

type optionsTypes =
  | {
      isReply: true;
      parentTweetId: string;
    }
  | {
      isReply: false | undefined;
      parentTweetId?: string;
    };

export const submitTweet = async (
  formData: FormData,
  options?: optionsTypes
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return;

    const tweetContent = formData.get("tweetText");
    if (!tweetContent) return;

    const error = Tweetschema.safeParse({ content: tweetContent.toString() });
    if (!error.success) return { error: error.error.format() };

    await db.tweet.create({
      data: {
        autherId: session.user.id,
        content: tweetContent.toString(),
        isReply: options?.isReply,
        parentTweetId: options?.parentTweetId,
      },
    });
    revalidatePath("/home");
    return {
      success: true,
      message: "Tweet post successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong, check console logs",
    };
  }
};