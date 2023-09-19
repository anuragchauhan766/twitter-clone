import { tweetsWithAutherAndLikes } from "@/utils/getHomeTimelineTweets";
import {
  RepliesWithParentTweetQueries,
  getRepliesWithParentTweet,
} from "@/utils/getRepliesWithParentTweet";
import { User, Prisma } from "@prisma/client";
import { type } from "os";

export type TweetsWithAutherAndLikes = Prisma.TweetGetPayload<
  typeof tweetsWithAutherAndLikes
>;
export type TweetCardProps = TweetsWithAutherAndLikes & {
  currentUserId: User["id"];
  isLikedByCurrentUser: boolean;
  isOnTweetPage?: boolean;
  isParentTweetwithReply?: boolean;
};
export type LikeHandler = ({
  userId,
  tweetId,
}: {
  userId: string;
  tweetId: string;
}) => Promise<void | unknown>;

export type RepliesWithParentTweet = Prisma.PromiseReturnType<
  typeof getRepliesWithParentTweet
>[0];
