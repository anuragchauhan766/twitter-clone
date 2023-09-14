import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// queries for relation field and select field
export const tweetsWithAutherAndLikes =
  Prisma.validator<Prisma.TweetDefaultArgs>()({
    include: {
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
      likes: {
        select: {
          LikedByUserId: true,
        },
      },
      auther: {
        select: {
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });
export const getHomeTimelineTweets = async (userId: string) => {
  "use server";
  try {
    const tweets = await db.tweet.findMany({
      where: {
        isReply: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      ...tweetsWithAutherAndLikes,
    });

    const tweetsWithLikes = tweets.map((tweet) => ({
      ...tweet,
      isLikedByCurrentUser: tweet.likes.some(
        (like) => like.LikedByUserId === userId
      ),
    }));

    return tweetsWithLikes;
  } catch (error) {
    throw error;
  }
};
