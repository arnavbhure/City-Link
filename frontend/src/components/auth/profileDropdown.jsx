import { createElement, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  CircleUserRound,
  House,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  PencilLine,
  UserX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import updateOpenForListing from "../../api/auth/updateOpenForListing";
import { userInfoActions } from "../../store/user/userSlice";

const navigationItems = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    to: "/dashboard",
    tone: "indigo",
  },
  {
    icon: PencilLine,
    title: "Edit profile",
    to: "/profile/edit",
    tone: "cyan",
  },
  {
    icon: UserX,
    title: "Blocked users",
    to: "/dashboard/blocked-users",
    tone: "rose",
  },
  {
    icon: House,
    title: "Home",
    to: "/",
    tone: "cyan",
  },
  {
    icon: LifeBuoy,
    title: "Contact",
    to: "/contactus",
    tone: "violet",
  },
];

const iconToneClasses = {
  indigo: "border-indigo-400/20 bg-indigo-500/10 text-indigo-300",
  cyan: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
  violet: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300",
  rose: "border-rose-400/20 bg-rose-500/10 text-rose-300",
};

const MenuAction = ({ icon, title, tone, onClick, destructive = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition duration-200 ${
        destructive ? "hover:bg-red-500/10" : "hover:bg-white/5"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
          destructive
            ? "border-red-400/20 bg-red-500/10 text-red-300"
            : iconToneClasses[tone]
        }`}
      >
        {createElement(icon, { className: "h-5 w-5" })}
      </div>

      <p
        className={`min-w-0 flex-1 text-sm font-medium transition ${
          destructive
            ? "text-red-300 group-hover:text-red-200"
            : "text-white group-hover:text-indigo-200"
        }`}
      >
        {title}
      </p>
    </button>
  );
};

const ListingVisibilityToggle = ({
  checked,
  helperText,
  isSaving,
  onToggle,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Open for listing"
      disabled={isSaving}
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition duration-200 ${
        isSaving
          ? "cursor-wait border-white/5 bg-white/2 opacity-80"
          : "border-emerald-400/15 bg-emerald-500/10 hover:border-emerald-300/30 hover:bg-emerald-400/10"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">Open for listing</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          {isSaving ? "Saving your preference..." : helperText}
        </p>
      </div>

      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
          checked
            ? "border-emerald-300/40 bg-emerald-300 text-slate-950"
            : "border-white/15 bg-slate-950/70 text-transparent"
        }`}
      >
        <Check className="h-4 w-4" />
      </span>
    </button>
  );
};

const ProfileDropdown = ({ handleOnLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isUpdatingListing, setIsUpdatingListing] = useState(false);
  const [listingError, setListingError] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleNavigate = (to) => {
    setOpen(false);
    navigate(to);
  };

  const handleLogoutClick = () => {
    setOpen(false);
    handleOnLogout();
  };

  const user = useSelector((state) => state.user);
  const hasCompletedListingProfile = Boolean(user.profile_listing_completed);
  const isOpenForListing = Boolean(user.open_for_listing);

  const listingHelperText =
    !hasCompletedListingProfile && isOpenForListing
      ? "You are opted in. Complete your roommate profile to appear in the roommates list."
      : !hasCompletedListingProfile
        ? "You are opted out for now. Turn this on when you want to appear in the roommates list."
        : isOpenForListing
          ? "Your profile can appear in the roommates list."
          : "Stay hidden from the roommates list until you opt in.";

  const handleListingToggle = async () => {
    if (isUpdatingListing) {
      return;
    }

    setListingError("");
    setIsUpdatingListing(true);

    const response = await updateOpenForListing(!isOpenForListing);

    if (response.success && response.user) {
      dispatch(userInfoActions.storeUserInfo(response.user));
    } else {
      setListingError(response.message);
    }

    setIsUpdatingListing(false);
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 pr-2.5 text-left backdrop-blur-sm transition duration-200 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-black/10 sm:gap-3 sm:px-2.5 sm:py-2 sm:pr-3"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] sm:h-10 sm:w-10">
          <CircleUserRound className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
        </div>

        <div className="hidden min-w-0 sm:block">
          <p className="text-sm font-semibold text-white">
            {user.full_name || "CityLink user"}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">Menu</p>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition duration-200 ${
            open ? "rotate-180 text-white" : "group-hover:text-white"
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2.5 w-[min(15rem,calc(100vw-1rem))] overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-900/95 p-2 shadow-[0_24px_60px_rgba(2,6,23,0.5)] backdrop-blur-xl sm:mt-3 sm:w-64">
          <div className="rounded-2xl border border-white/10 bg-white/3 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-white">
                <CircleUserRound className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white break-all">
                  {user.email || "Signed in user"}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">Signed in</p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-2">
            <ListingVisibilityToggle
              checked={isOpenForListing}
              helperText={listingHelperText}
              isSaving={isUpdatingListing}
              onToggle={handleListingToggle}
            />

            {listingError ? (
              <p className="rounded-[0.95rem] border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-xs leading-5 text-rose-100/90">
                {listingError}
              </p>
            ) : null}

            {navigationItems.map((item) => (
              <MenuAction
                key={item.title}
                {...item}
                onClick={() => handleNavigate(item.to)}
              />
            ))}
          </div>

          <div className="my-2 border-t border-white/10" />
          <MenuAction
            icon={LogOut}
            title="Log out"
            onClick={handleLogoutClick}
            destructive
          />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
