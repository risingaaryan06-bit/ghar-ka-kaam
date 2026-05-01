import { r as reactExports, j as jsxRuntimeExports, G as Presence, I as Primitive, J as useControllableState, s as useComposedRefs, K as composeEventHandlers, p as createContextScope, e as cn, a as useInternetIdentity, M as useNavigate, n as HardHat, b as Button, N as LogIn, L as Link, H as House, g as Sparkles, B as Briefcase, c as ue } from "./index-D5ASyzS6.js";
import { M as MAID_WORK_TYPES, W as WORK_TYPE_META, U as UserRole, c as createActor } from "./types-D7fAxLqk.js";
import { C as Card, a as CardContent } from "./card-JZLgIumC.js";
import { u as usePrevious, f as useSize, g as Check, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-b-AYbpxr.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Bz6Jx6wd.js";
import { I as Input } from "./input-ZAgHlKlK.js";
import { L as Label } from "./label-BRLaVITT.js";
import { u as useActor } from "./useActor-BVPqwPhj.js";
import { S as Shield } from "./shield-Bq4Jsf7E.js";
import { Z as Zap } from "./zap-DHP3rMnD.js";
import { S as Smartphone } from "./smartphone-Fm87mMKn.js";
import { C as CircleCheck } from "./circle-check-CVdAC1pa.js";
import { W as Wrench } from "./wrench-BeTwoe7Q.js";
import "./index-DvqHBqJ-.js";
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const SKILLS_OPTIONS = [
  "Painting",
  "Carpentry",
  "Plumbing",
  "Electrical",
  "Masonry",
  "General Labor"
];
function LoginPage() {
  const { isAuthenticated, login, isLoggingIn, isInitializing } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [showProfileSetup, setShowProfileSetup] = reactExports.useState(false);
  const [setupStep, setSetupStep] = reactExports.useState("role");
  const [role, setRole] = reactExports.useState("homeowner");
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [selectedSkills, setSelectedSkills] = reactExports.useState([]);
  const [yearsExp, setYearsExp] = reactExports.useState("");
  const [maidCategory, setMaidCategory] = reactExports.useState("");
  const [dailyRate, setDailyRate] = reactExports.useState("");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [checkingProfile, setCheckingProfile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated || !actor) return;
    setCheckingProfile(true);
    actor.getCallerUserProfile().then((profile) => {
      if (!profile) {
        setShowProfileSetup(true);
      } else {
        navigate({ to: "/dashboard" });
      }
    }).catch(() => {
      navigate({ to: "/dashboard" });
    }).finally(() => setCheckingProfile(false));
  }, [isAuthenticated, actor, navigate]);
  const toggleSkill = (skill) => {
    setSelectedSkills(
      (prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };
  const handleProfileSave = async () => {
    if (!name.trim() || !phone.trim() || !location.trim()) {
      ue.error("Please fill in your name, phone, and location");
      return;
    }
    if (role === "laborer" && selectedSkills.length === 0) {
      ue.error("Please select at least one skill");
      return;
    }
    if (role === "maid" && !maidCategory) {
      ue.error("Please select your service category");
      return;
    }
    if (!actor) return;
    setIsSaving(true);
    try {
      const backendRole = role === "homeowner" ? UserRole.homeowner : role === "maid" ? UserRole.maid : UserRole.laborer;
      const profile = await actor.createUserProfile(
        name.trim(),
        phone.trim(),
        location.trim(),
        backendRole
      );
      if (role === "laborer") {
        await actor.saveCallerUserProfile({
          ...profile,
          skills: selectedSkills,
          yearsExperience: yearsExp ? BigInt(Number(yearsExp)) : void 0
        });
      } else if (role === "maid") {
        await actor.saveCallerUserProfile({
          ...profile,
          maidCategory: maidCategory || void 0,
          skills: [maidCategory],
          yearsExperience: yearsExp ? BigInt(Number(yearsExp)) : void 0
        });
      }
      ue.success("Profile created! Welcome to Ghar Ka Kaam 🎉");
      setShowProfileSetup(false);
      navigate({ to: "/dashboard" });
    } catch (_err) {
      ue.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const isLoading = isLoggingIn || isInitializing || checkingProfile;
  const roleLabel = role === "homeowner" ? "Homeowner" : role === "maid" ? "Maid Service Provider" : "Skilled Laborer";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 z-0",
        style: {
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-foreground/65" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        "data-ocid": "login.dialog",
        className: "relative z-10 w-full max-w-md shadow-2xl border-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl construction-gradient flex items-center justify-center mb-4 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-8 w-8 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-2xl text-foreground leading-tight", children: "Welcome to Ghar Ka Kaam" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 leading-relaxed", children: "Connect with skilled workers and home service providers, or find work across India." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Secure, password-free login" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: "Internet Identity uses your device's biometrics or PIN — no passwords, no email needed." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "login.submit_button",
              className: "w-full btn-primary py-3 text-base h-auto",
              onClick: login,
              disabled: isLoading,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-5 w-5 mr-2" }),
                isLoading ? "Connecting..." : "Login with Internet Identity"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-2 gap-2", children: [
            { icon: Zap, text: "Instant login" },
            { icon: Shield, text: "Private & secure" },
            { icon: Smartphone, text: "Works on mobile" },
            { icon: CircleCheck, text: "No password" }
          ].map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-primary" }),
                text
              ]
            },
            text
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
              "New here?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/signup",
                  className: "text-primary font-semibold hover:underline",
                  children: "Learn how sign up works"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                className: "text-xs text-muted-foreground hover:text-primary transition-colors",
                children: "← Back to Home"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showProfileSetup, onOpenChange: () => {
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "profile_setup.dialog",
        className: "max-w-md max-h-[90vh] overflow-y-auto",
        onInteractOutside: (e) => e.preventDefault(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl construction-gradient flex items-center justify-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-5 w-5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display font-bold text-lg", children: setupStep === "role" ? "Who are you?" : "Complete Your Profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: setupStep === "role" ? "Tell us how you'll use Ghar Ka Kaam" : "Just a few details to get started" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-8 rounded-full bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-1.5 w-8 rounded-full transition-colors ${setupStep === "profile" ? "bg-primary" : "bg-muted"}`
                }
              )
            ] })
          ] }),
          setupStep === "role" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "I want to:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  "data-ocid": "profile_setup.homeowner.toggle",
                  type: "button",
                  onClick: () => setRole("homeowner"),
                  className: `relative flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth cursor-pointer text-left ${role === "homeowner" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`,
                  children: [
                    role === "homeowner" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute top-3 right-3 h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${role === "homeowner" ? "construction-gradient" : "bg-muted"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          House,
                          {
                            className: `h-6 w-6 ${role === "homeowner" ? "text-primary-foreground" : "text-muted-foreground"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Post Jobs" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "I need construction or home services" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  "data-ocid": "profile_setup.laborer.toggle",
                  type: "button",
                  onClick: () => setRole("laborer"),
                  className: `relative flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth cursor-pointer text-left ${role === "laborer" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`,
                  children: [
                    role === "laborer" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute top-3 right-3 h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${role === "laborer" ? "construction-gradient" : "bg-muted"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Wrench,
                          {
                            className: `h-6 w-6 ${role === "laborer" ? "text-primary-foreground" : "text-muted-foreground"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Find Work (Laborer)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mason, carpenter, electrician, plumber…" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  "data-ocid": "profile_setup.maid.toggle",
                  type: "button",
                  onClick: () => setRole("maid"),
                  className: `relative flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth cursor-pointer text-left ${role === "maid" ? "border-rose-400 bg-rose-50" : "border-border bg-card hover:border-rose-300"}`,
                  children: [
                    role === "maid" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute top-3 right-3 h-4 w-4 text-rose-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${role === "maid" ? "bg-gradient-to-br from-rose-400 to-pink-500" : "bg-muted"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Sparkles,
                          {
                            className: `h-6 w-6 ${role === "maid" ? "text-white" : "text-muted-foreground"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Maid Service Provider" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cook, cleaner, childcare, laundry…" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "profile_setup.role_next.primary_button",
                className: "w-full btn-primary h-11",
                onClick: () => setSetupStep("profile"),
                children: [
                  "Continue as ",
                  roleLabel,
                  " →"
                ]
              }
            )
          ] }),
          setupStep === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-2 py-2 px-3 rounded-lg border ${role === "maid" ? "bg-rose-50 border-rose-200" : "bg-primary/10 border-primary/20"}`,
                children: [
                  role === "homeowner" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    House,
                    {
                      className: `h-4 w-4 ${role === "homeowner" ? "text-primary" : "text-rose-500"}`
                    }
                  ) : role === "maid" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-rose-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-xs font-medium ${role === "maid" ? "text-rose-600" : "text-primary"}`,
                      children: [
                        "Signing up as ",
                        roleLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSetupStep("role"),
                      className: "ml-auto text-xs text-muted-foreground hover:text-primary underline",
                      children: "Change"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ps-name", className: "text-sm font-medium", children: [
                  "Full Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ps-name",
                    "data-ocid": "profile_setup.name.input",
                    placeholder: "e.g. Priya Sharma",
                    value: name,
                    onChange: (e) => setName(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ps-phone", className: "text-sm font-medium", children: [
                  "Phone Number ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ps-phone",
                    "data-ocid": "profile_setup.phone.input",
                    placeholder: "e.g. 9876543210",
                    type: "tel",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ps-location", className: "text-sm font-medium", children: [
                  "City / Location ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ps-location",
                    "data-ocid": "profile_setup.location.input",
                    placeholder: "e.g. Delhi, Mumbai, Bangalore",
                    value: location,
                    onChange: (e) => setLocation(e.target.value)
                  }
                )
              ] }),
              role === "laborer" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                    "Your Skills ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: SKILLS_OPTIONS.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleSkill(skill),
                      "data-ocid": `profile_setup.skill_${skill.toLowerCase().replace(" ", "_")}.checkbox`,
                      className: `flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-smooth text-left ${selectedSkills.includes(skill) ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Checkbox,
                          {
                            checked: selectedSkills.includes(skill),
                            onCheckedChange: () => toggleSkill(skill),
                            className: "shrink-0 pointer-events-none"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: skill })
                      ]
                    },
                    skill
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ps-exp", className: "text-sm font-medium", children: "Years of Experience" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ps-exp",
                      "data-ocid": "profile_setup.experience.input",
                      placeholder: "e.g. 5",
                      type: "number",
                      min: "0",
                      max: "50",
                      value: yearsExp,
                      onChange: (e) => setYearsExp(e.target.value)
                    }
                  )
                ] })
              ] }),
              role === "maid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "ps-maid-cat",
                      className: "text-sm font-medium",
                      children: [
                        "Service Category",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: maidCategory,
                      onValueChange: setMaidCategory,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            id: "ps-maid-cat",
                            "data-ocid": "profile_setup.maid_category.select",
                            className: "w-full",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose your main service..." })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MAID_WORK_TYPES.map((type) => {
                          const meta = WORK_TYPE_META[type];
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: type, children: [
                            meta == null ? void 0 : meta.icon,
                            " ",
                            (meta == null ? void 0 : meta.label) ?? type
                          ] }, type);
                        }) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ps-rate", className: "text-sm font-medium", children: "Daily / Hourly Rate (₹)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ps-rate",
                      "data-ocid": "profile_setup.rate.input",
                      placeholder: "e.g. 500 per day or 100 per hour",
                      value: dailyRate,
                      onChange: (e) => setDailyRate(e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Let families know your expected charge" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "ps-exp-maid",
                      className: "text-sm font-medium",
                      children: "Years of Experience"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ps-exp-maid",
                      "data-ocid": "profile_setup.experience.input",
                      placeholder: "e.g. 3",
                      type: "number",
                      min: "0",
                      max: "50",
                      value: yearsExp,
                      onChange: (e) => setYearsExp(e.target.value)
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "profile_setup.back.secondary_button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setSetupStep("role"),
                  disabled: isSaving,
                  children: "Back"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "profile_setup.submit_button",
                  className: `flex-1 ${role === "maid" ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white" : "btn-primary"}`,
                  onClick: handleProfileSave,
                  disabled: isSaving,
                  children: isSaving ? "Saving..." : "Create Profile 🚀"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  LoginPage as default
};
