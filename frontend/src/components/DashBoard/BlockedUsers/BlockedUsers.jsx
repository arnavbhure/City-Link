import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import getBlockedUsers from "../../../api/chat/getBlockedUsers";
import toggleBlockUser from "../../../api/chat/BlockUser";

const BlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setBlockedUsersFunction = async () => {
      try {
        setIsLoading(true);
        const response = await getBlockedUsers();
        setBlockedUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch blocked users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setBlockedUsersFunction();
  }, []);

  const handleOnUnblock = async (toUnblockId) => {
    try {
      setIsLoading(true);

      await toggleBlockUser(toUnblockId);

      setBlockedUsers((prev) => prev.filter((user) => user.id !== toUnblockId));
    } catch (err) {
      console.log("Error unblocking user", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-5xl space-y-6">
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Blocked users
          </h1>

          <div className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-4 backdrop-blur-sm sm:p-6">
            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`blocked-skeleton-${index}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-3 w-40 rounded-full bg-white/10" />
                      <div className="h-2 w-24 rounded-full bg-white/5" />
                    </div>
                    <div className="h-8 w-28 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
            ) : blockedUsers.length === 0 ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/60 px-6 py-10">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <p className="text-base font-semibold text-white">
                    No blocked users
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {blockedUsers.map((user) => (
                  <div
                    key={user.id ?? user.email ?? user.name}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.full_name || "CityLink User"}
                      </p>
                      {user.city ? (
                        <p className="truncate text-xs text-slate-400">
                          {user.city}
                        </p>
                      ) : null}
                    </div>

                    <button
                      onClick={() => handleOnUnblock(user.id)}
                      type="button"
                      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                    >
                      Unblock user
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlockedUsers;
