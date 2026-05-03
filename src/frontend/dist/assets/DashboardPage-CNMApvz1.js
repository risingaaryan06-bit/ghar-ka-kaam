import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, aM as shimExports, K as Primitive, a9 as useCallbackRef, aN as useLayoutEffect2, a as cn, n as useInternetIdentity, _ as useQueryClient, i as PageLoader, aO as LayoutDashboard, L as Link, B as Button, k as CirclePlus, b as Briefcase, U as Users, d as Sparkles, u as ue, H as House, l as HardHat } from "./index-Bl6m0gAG.js";
import { U as UserRole, J as JobStatus, a as PaymentStatus, P as PaymentType, c as createActor } from "./backend-DBy7dtNU.js";
import { J as JobCard } from "./JobCard-CBaraxji.js";
import { B as Badge } from "./badge-BnwEIvSF.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BOlP-LKW.js";
import { I as Input } from "./input-Cwar-sC0.js";
import { L as Label } from "./label-CBWPSbta.js";
import { S as Skeleton } from "./skeleton-Cl90XyEF.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, U as User, c as TabsContent } from "./tabs-CJ2DHDLm.js";
import { T as Textarea } from "./textarea-CGwFhK7E.js";
import { f as useGetCallerProfile, l as useGetMyPostedJobs, m as useGetMyNotifications, n as useMarkNotificationRead, o as useMarkAllNotificationsRead, p as useSaveCallerUserProfile } from "./useQueries-DlGKg5lf.js";
import { W as WORK_TYPE_META, f as formatBudget, t as timeAgo } from "./types-DGUL2UgN.js";
import { u as useActor } from "./useActor-Bw0dW3YB.js";
import { B as Bell } from "./bell-n7YKEDVZ.js";
import { m as motion } from "./proxy-BQt9Bh9G.js";
import { W as Wrench } from "./wrench-mSk-es6i.js";
import { C as Clock } from "./clock-Fe6S3N1I.js";
import { C as CircleCheck } from "./circle-check-C-fSTZgk.js";
import { M as MapPin } from "./index-CL8mI724.js";
import { S as Star } from "./star-FaVzG57j.js";
import "./calendar-FsnrWoOi.js";
import "./index-CgEjvbCo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
];
const CircleDollarSign = createLucideIcon("circle-dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root = Avatar$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function paymentTypeLabel(type) {
  return type === PaymentType.deposit ? "Deposit" : "Final Payment";
}
function paymentStatusColor(status) {
  return status === PaymentStatus.paid ? "bg-primary/12 text-primary border-primary/25 border" : "bg-secondary/10 text-secondary border-secondary/20 border";
}
function StatCard({
  icon: Icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `bg-card rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${accent ? "border-l-4 border-l-primary border-t border-r border-b border-border" : "border-border"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 h-11 w-11 rounded-xl bg-primary/12 flex items-center justify-center border border-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-extrabold text-xl text-foreground leading-none", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate font-medium", children: label })
        ] })
      ] })
    }
  );
}
function NotificationsPanel({
  notifications,
  isLoading
}) {
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const unread = notifications.filter((n) => !n.read).length;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["n1", "n2", "n3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, k)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-medium", children: [
        unread,
        " unread notification",
        unread !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "dashboard.notifications.mark_all_read.button",
          size: "sm",
          variant: "ghost",
          onClick: () => markAllRead.mutate(void 0, {
            onSuccess: () => ue.success("All notifications marked as read")
          }),
          disabled: markAllRead.isPending,
          className: "text-xs text-primary hover:text-primary/80",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 mr-1" }),
            "Mark all read"
          ]
        }
      )
    ] }),
    notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "dashboard.notifications.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4 text-2xl", children: "🔔" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: "No Notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You're all caught up! New activity will appear here." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: notifications.map((notif, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: idx * 0.04 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": `dashboard.notification.item.${idx + 1}`,
            className: `cursor-pointer rounded-xl transition-all duration-200 hover:shadow-md ${!notif.read ? "border-l-4 border-l-primary bg-primary/5 border-t border-r border-b border-border" : "border-border hover:border-primary/20"}`,
            onClick: () => !notif.read && markRead.mutate(notif.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center ${!notif.read ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-snug", children: notif.messageText }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: timeAgo(notif.createdAt) })
                ] })
              ] }),
              !notif.read && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "flex-shrink-0 text-xs bg-primary text-primary-foreground border-0 rounded-full", children: "New" })
            ] })
          }
        )
      },
      notif.id.toString()
    )) })
  ] });
}
function ProfileEditSection({ profile }) {
  var _a, _b;
  const saveProfile = useSaveCallerUserProfile();
  const [form, setForm] = reactExports.useState({
    name: (profile == null ? void 0 : profile.name) ?? "",
    phone: (profile == null ? void 0 : profile.phone) ?? "",
    location: (profile == null ? void 0 : profile.location) ?? "",
    skills: ((_a = profile == null ? void 0 : profile.skills) == null ? void 0 : _a.join(", ")) ?? "",
    yearsExperience: ((_b = profile == null ? void 0 : profile.yearsExperience) == null ? void 0 : _b.toString()) ?? ""
  });
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (profile) {
      setForm({
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
        skills: ((_a2 = profile.skills) == null ? void 0 : _a2.join(", ")) ?? "",
        yearsExperience: ((_b2 = profile.yearsExperience) == null ? void 0 : _b2.toString()) ?? ""
      });
    }
  }, [profile]);
  function handleSave(e) {
    e.preventDefault();
    if (!profile) return;
    const updatedProfile = {
      ...profile,
      name: form.name.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      skills: profile.role === UserRole.laborer && form.skills.trim() ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : profile.skills,
      yearsExperience: profile.role === UserRole.laborer && form.yearsExperience ? BigInt(form.yearsExperience) : profile.yearsExperience
    };
    saveProfile.mutate(updatedProfile, {
      onSuccess: () => ue.success("Profile updated successfully!"),
      onError: () => ue.error("Failed to update profile. Please try again.")
    });
  }
  const isWorker = (profile == null ? void 0 : profile.role) === UserRole.laborer;
  const isMaid = (profile == null ? void 0 : profile.role) === UserRole.maid;
  const isWorkerOrMaid = isWorker || isMaid;
  const skillsFilledIn = (profile == null ? void 0 : profile.skills) && profile.skills.length > 0;
  const experienceFilledIn = (profile == null ? void 0 : profile.yearsExperience) !== void 0;
  const profileComplete = !isWorkerOrMaid || skillsFilledIn && experienceFilledIn;
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "dashboard.profile.empty_state",
        className: "flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4 text-2xl", children: "👤" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: "Profile Not Set Up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Please log in and create a profile to continue." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl space-y-5", children: [
    isWorkerOrMaid && !profileComplete && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-l-secondary bg-secondary/5 border-t border-r border-b border-secondary/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-secondary flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Complete your profile to get more jobs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Add your skills and experience to appear in search results." })
      ] })
    ] }) }),
    isWorkerOrMaid && profileComplete && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-l-primary bg-primary/5 border-t border-r border-b border-primary/15 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-primary flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Profile complete! You appear in search results." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Avatar,
          {
            className: "h-13 w-13 border-2 border-primary/25",
            style: { height: "52px", width: "52px" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary/25 to-primary/8 text-primary font-bold font-display text-lg", children: initials(profile.name) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: profile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground capitalize flex items-center gap-1.5 mt-0.5", children: [
            profile.role === UserRole.homeowner ? /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3 w-3 text-primary" }) : profile.role === UserRole.maid ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-3 w-3 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: profile.role }),
            profile.averageRating !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 ml-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 text-primary fill-primary" }),
              profile.averageRating.toFixed(1)
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "profile-name",
                className: "text-xs font-semibold text-muted-foreground",
                children: "Full Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-name",
                "data-ocid": "dashboard.profile.name.input",
                value: form.name,
                onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                placeholder: "Your full name",
                required: true,
                className: "rounded-xl border-border focus:border-primary/50 h-10"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "profile-phone",
                className: "text-xs font-semibold text-muted-foreground",
                children: "Phone Number"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-phone",
                "data-ocid": "dashboard.profile.phone.input",
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                placeholder: "+91 XXXXX XXXXX",
                className: "rounded-xl border-border focus:border-primary/50 h-10"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "profile-location",
              className: "text-xs font-semibold text-muted-foreground",
              children: "Location"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "profile-location",
              "data-ocid": "dashboard.profile.location.input",
              value: form.location,
              onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
              placeholder: "City, State",
              className: "rounded-xl border-border focus:border-primary/50 h-10"
            }
          )
        ] }),
        isWorkerOrMaid && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "profile-skills",
                className: "text-xs font-semibold text-muted-foreground",
                children: [
                  "Skills",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 font-normal", children: "(comma-separated)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "profile-skills",
                "data-ocid": "dashboard.profile.skills.textarea",
                value: form.skills,
                onChange: (e) => setForm((f) => ({ ...f, skills: e.target.value })),
                placeholder: isMaid ? "e.g. Cooking, Cleaning, Laundry" : "e.g. Masonry, Tiling, Plastering",
                rows: 2,
                className: "resize-none rounded-xl border-border focus:border-primary/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "profile-experience",
                className: "text-xs font-semibold text-muted-foreground",
                children: "Years of Experience"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-experience",
                "data-ocid": "dashboard.profile.experience.input",
                type: "number",
                min: 0,
                max: 50,
                value: form.yearsExperience,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  yearsExperience: e.target.value
                })),
                placeholder: "e.g. 5",
                className: "rounded-xl border-border focus:border-primary/50 h-10"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "dashboard.profile.save.submit_button",
            type: "submit",
            className: "btn-primary w-full sm:w-auto h-10",
            disabled: saveProfile.isPending,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
              saveProfile.isPending ? "Saving..." : "Save Changes"
            ]
          }
        )
      ] }) })
    ] })
  ] });
}
function HomeownerDashboard({
  jobs,
  notifications,
  profile,
  notifsLoading
}) {
  var _a;
  const { actor, isFetching } = useActor(createActor);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [allPayments, setAllPayments] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!actor || isFetching || jobs.length === 0) return;
    Promise.all(jobs.map((j) => actor.getPaymentsForJob(j.id))).then(
      (results) => setAllPayments(results.flat())
    );
  }, [actor, isFetching, jobs]);
  const activeJobs = jobs.filter(
    (j) => j.status === JobStatus.open || j.status === JobStatus.assigned
  ).length;
  const completedJobs = jobs.filter(
    (j) => j.status === JobStatus.completed
  ).length;
  const totalSpent = allPayments.filter((p) => p.status === PaymentStatus.paid).reduce((acc, p) => acc + p.amountPaid, 0n);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-6 overflow-hidden relative banner-gradient", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 right-0 w-40 h-full opacity-15",
          style: {
            background: "radial-gradient(circle at 100% 50%, oklch(0.80 0.12 350) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-bold uppercase tracking-widest mb-1", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-extrabold text-xl text-white leading-tight", children: [
            ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")[0]) ?? "Homeowner",
            " 🏠"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-sm mt-0.5", children: "Manage your jobs and track progress." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "dashboard.homeowner.post_job.primary_button",
            size: "sm",
            className: "bg-primary text-primary-foreground hover:bg-primary/85 font-semibold shadow-pink border-0 h-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1.5" }),
              "Post New Job"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Briefcase,
          label: "Active Jobs",
          value: activeJobs,
          accent: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Total Jobs", value: jobs.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CircleCheck, label: "Completed", value: completedJobs }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: CircleDollarSign,
          label: "Total Spent",
          value: formatBudget(totalSpent)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "dashboard.homeowner.quick_post_job.button",
          variant: "outline",
          size: "sm",
          className: "text-xs rounded-xl border-border hover:border-primary/40 hover:bg-primary/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-3.5 w-3.5 mr-1.5 text-primary" }),
            "Post a Job"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "dashboard.homeowner.browse_workers.button",
          variant: "outline",
          size: "sm",
          className: "text-xs rounded-xl border-border hover:border-primary/40 hover:bg-primary/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 mr-1.5 text-primary" }),
            "Browse Workers"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/maids", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "dashboard.homeowner.find_maids.button",
          variant: "outline",
          size: "sm",
          className: "text-xs rounded-xl border-border hover:border-primary/40 hover:bg-primary/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 mr-1.5 text-primary" }),
            "Find Maids"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "jobs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto flex overflow-x-auto bg-muted/50 rounded-xl p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "dashboard.homeowner.jobs.tab",
            value: "jobs",
            className: "flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5 mr-1.5" }),
              "My Jobs"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "dashboard.homeowner.notifications.tab",
            value: "notifications",
            className: "flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Alerts",
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 leading-4 font-bold", children: unreadCount })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "dashboard.homeowner.payments.tab",
            value: "payments",
            className: "flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDollarSign, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Payments"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "dashboard.homeowner.profile.tab",
            value: "profile",
            className: "flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Profile"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "jobs", className: "mt-5", children: jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.homeowner.jobs.empty_state",
          className: "flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-2xl", children: "📋" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: "No Jobs Posted Yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "Post your first job to start finding skilled workers." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "dashboard.homeowner.first_job.primary_button",
                className: "btn-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-2" }),
                  "Post a Job"
                ]
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: jobs.map((job, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job, index: idx + 1 }, job.id.toString())) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotificationsPanel,
        {
          notifications,
          isLoading: notifsLoading
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "payments", className: "mt-5", children: allPayments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.homeowner.payments.empty_state",
          className: "flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-2xl", children: "💳" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: "No Payments Yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Payment history will appear here once you start hiring workers." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: allPayments.map((payment, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `dashboard.payment.item.${idx + 1}`,
          className: "card-elevated rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 h-10 w-10 rounded-xl bg-primary/12 flex items-center justify-center border border-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDollarSign, { className: "h-4 w-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: formatBudget(payment.amountPaid) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  paymentTypeLabel(payment.paymentType),
                  " · Job #",
                  payment.jobId.toString(),
                  " ·",
                  " ",
                  timeAgo(payment.createdAt)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold rounded-full px-3 py-1 flex-shrink-0 ${paymentStatusColor(payment.status)}`,
                children: payment.status === PaymentStatus.paid ? "Paid" : "Pending"
              }
            )
          ] })
        },
        payment.id.toString()
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileEditSection, { profile }) })
    ] })
  ] });
}
function WorkerDashboard({
  jobs,
  notifications,
  profile,
  notifsLoading,
  jobsLoading
}) {
  var _a;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isMaid = (profile == null ? void 0 : profile.role) === UserRole.maid;
  const activeJobs = jobs.filter(
    (j) => j.status === JobStatus.assigned || j.status === JobStatus.open
  ).length;
  const completedJobs = (profile == null ? void 0 : profile.completedJobsCount) ? Number(profile.completedJobsCount) : 0;
  const hasSkills = (profile == null ? void 0 : profile.skills) && profile.skills.length > 0;
  const hasExperience = (profile == null ? void 0 : profile.yearsExperience) !== void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-6 overflow-hidden relative banner-gradient", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 right-0 w-40 h-full opacity-15",
          style: {
            background: "radial-gradient(circle at 100% 50%, oklch(0.80 0.12 350) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-bold uppercase tracking-widest mb-1", children: "Welcome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-extrabold text-xl text-white leading-tight", children: [
            ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")[0]) ?? "Worker",
            " ",
            isMaid ? "✨" : "👷"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-sm mt-0.5", children: isMaid ? "Track your household service jobs." : "Track your construction jobs and grow your reputation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: isMaid ? "/maids" : "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "dashboard.worker.find_work.primary_button",
            size: "sm",
            className: "btn-primary shadow-pink h-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 mr-1.5" }),
              isMaid ? "Browse Maid Jobs" : "Find Jobs"
            ]
          }
        ) })
      ] })
    ] }),
    (!hasSkills || !hasExperience) && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-l-secondary bg-secondary/5 border-t border-r border-b border-secondary/15 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-5 w-5 text-secondary flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Complete your profile to attract more homeowners" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          !hasSkills && "Add your skills. ",
          !hasExperience && "Add years of experience."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Clock, label: "Active Jobs", value: activeJobs, accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CircleCheck, label: "Completed", value: completedJobs }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: MapPin,
          label: "Location",
          value: (profile == null ? void 0 : profile.location) ?? "—"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "jobs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto flex overflow-x-auto bg-muted/50 rounded-xl p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "dashboard.worker.jobs.tab",
            value: "jobs",
            className: "flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5 mr-1.5" }),
              "My Jobs"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "dashboard.worker.notifications.tab",
            value: "notifications",
            className: "flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Alerts",
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 leading-4 font-bold", children: unreadCount })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "dashboard.worker.profile.tab",
            value: "profile",
            className: "flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Profile"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "jobs", className: "mt-5", children: jobsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["j1", "j2", "j3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, k)) }) : jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.worker.jobs.empty_state",
          className: "flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-2xl", children: "💼" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: "No Active Jobs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "Browse open jobs and contact homeowners to get hired." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "dashboard.worker.first_job.primary_button",
                className: "btn-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 mr-2" }),
                  "Browse Jobs"
                ]
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: jobs.map((job, idx) => {
        var _a2;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.05 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                "data-ocid": `dashboard.worker.job.item.${idx + 1}`,
                className: "card-elevated rounded-xl",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 h-10 w-10 rounded-xl bg-primary/12 flex items-center justify-center text-xl border border-primary/15", children: ((_a2 = WORK_TYPE_META[job.workType]) == null ? void 0 : _a2.icon) ?? "🛠️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm truncate", children: job.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary" }),
                      job.location
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      formatBudget(job.budget),
                      " ·",
                      " ",
                      Number(job.timelineDays),
                      " days"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: job.status === JobStatus.assigned ? "default" : "outline",
                      className: "text-xs capitalize flex-shrink-0",
                      children: job.status
                    }
                  )
                ] }) })
              }
            )
          },
          job.id.toString()
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotificationsPanel,
        {
          notifications,
          isLoading: notifsLoading
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileEditSection, { profile }) })
    ] })
  ] });
}
function DashboardPage() {
  const { isAuthenticated } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCallerProfile();
  const { data: postedJobs = [], isLoading: jobsLoading } = useGetMyPostedJobs();
  const { data: notifications = [], isLoading: notifsLoading } = useGetMyNotifications();
  useQueryClient();
  const isLoading = profileLoading || jobsLoading;
  if (!isAuthenticated || isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Loading your dashboard..." });
  }
  const isWorkerOrMaid = (profile == null ? void 0 : profile.role) === UserRole.laborer || (profile == null ? void 0 : profile.role) === UserRole.maid;
  const unreadCount = notifications.filter((n) => !n.read).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b-2 border-primary/10 py-6 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-2xl construction-gradient flex items-center justify-center shadow-pink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-xl text-foreground leading-tight", children: isWorkerOrMaid ? "My Dashboard" : "Homeowner Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5", children: [
            (profile == null ? void 0 : profile.name) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: profile.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: (profile == null ? void 0 : profile.role) ?? "..." }),
            unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-primary font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
                unreadCount,
                " new"
              ] })
            ] })
          ] })
        ] })
      ] }),
      !isWorkerOrMaid && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "dashboard.header.post_job.primary_button",
          className: "btn-primary h-10",
          size: "sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1.5" }),
            "Post Job"
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        children: isWorkerOrMaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          WorkerDashboard,
          {
            jobs: postedJobs,
            notifications,
            profile: profile ?? null,
            notifsLoading,
            jobsLoading
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          HomeownerDashboard,
          {
            jobs: postedJobs,
            notifications,
            profile: profile ?? null,
            notifsLoading
          }
        )
      }
    ) })
  ] });
}
export {
  DashboardPage as default
};
