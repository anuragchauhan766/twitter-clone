import GoBackButton from "@/components/common/button/GoBackButton";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";
import { getServerSession } from "next-auth";
import { getUserDetails } from "@/utils/getUserDetails";
import ProfileImages from "@/components/common/ProfileImages";
import { notFound } from "next/navigation";
import EditProfileButton from "@/components/common/button/EditProfileButton";
import FollowButton from "@/components/common/button/FollowButton";
import { BiCalendar } from "react-icons/bi";
import moment from "moment";
import Navigation from "@/components/UserPage/Navigation";
import Link from "next/link";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthRequiredError();
  const userProfile = await getUserDetails(params.username, session.user.id);

  if (!userProfile) {
    notFound();
  }
  const navItems = {
    Posts: `/${params.username}`,
    Replies: `/${params.username}/with_replies`,
    Likes: `/${params.username}/likes`,
  };
  return (
    <div className=" w-full">
      {/* top header bar */}
      <div className="w-full  font-bold text-base xs:text-xl p-1 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 gap-6 ps-2 z-50">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">{userProfile.name}</span>
          <span className="font-light text-gray-500 text-xs">
            {userProfile._count.tweets} Posts
          </span>
        </div>
      </div>

      <div className="w-fulll flex flex-col">
        {/* cover image */}
        <div className="w-full h-52">
          <div className="w-full h-full bg-white/25 "></div>
        </div>
        {/* Profile details */}
        <div
          className="p-4 flex flex-col gap-2 items-start  justify-center"
          data-testid="UserProfileInfo"
        >
          <div className="w-full flex justify-between items-start ">
            <div className=" relative w-1/4 h-full">
              <div
                className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-visible pb-10"
                data-testid="user-Profile-photo"
              >
                <ProfileImages
                  ImgUrl={userProfile.image}
                  ImgSize="200"
                  className="w-24 h-24 xs:w-32 xs:h-32 min-w-[40px] border-2 xs:border-4"
                />
              </div>
            </div>
            <div>
              {userProfile.id === session.user.id ? (
                <EditProfileButton />
              ) : (
                <FollowButton
                  currentUserId={session.user.id}
                  userIdTofollow={userProfile.id}
                  isFollowing={userProfile.isFollowingByCurrentUser}
                />
              )}
            </div>
          </div>
          <div
            className="flex flex-col items-start justify-center  "
            data-test-id="username"
          >
            <span className="text-xl font-bold ">{userProfile.name}</span>
            <span className="text-base font-light text-gray-500">
              @{userProfile.username}
            </span>
          </div>
          {/* discription */}
          <div
            className=" flex items-center justify-start pe-5 text-base break-words font-normal"
            data-testid="userDescription"
          >
            <span>{userProfile.discription ?? "Discription"}</span>
          </div>
          {/* joinded on */}
          <div className="flex items-center justify-start gap-2 text-gray-500">
            <BiCalendar />
            <span className="text-base font-light ">
              {moment(userProfile.createdAt).format("[Joined] MMMM YYYY")}
            </span>
          </div>
          {/* followers Following */}
          <div
            className="flex gap-2 items-center justify-start"
            data-testid="followers"
          >
            <Link
              href={`${params.username}/following`}
              className="flex items-center gap-1 hover:underline decoration-1"
            >
              {userProfile._count.following}
              <span className="text-base font-light text-gray-500">
                Following
              </span>
            </Link>
            <Link
              href={`${params.username}/followers`}
              className="flex items-center gap-1 hover:underline decoration-1"
            >
              {userProfile._count.follower}
              <span className="text-base font-light text-gray-500">
                Followers
              </span>
            </Link>
          </div>
        </div>
      </div>
      <nav>
        <Navigation username={params.username} navItems={navItems} />
      </nav>
      <div className="mb-16">{children}</div>
    </div>
  );
}
