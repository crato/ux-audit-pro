"use client"

import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type State = {
  toasts: ToasterToast[];
};

// Actions
type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

// Toast timeouts store
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// Generate unique IDs for toasts
let count = 0;
function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

// Pure reducer for state management
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || !action.toastId
            ? { ...t, open: false }
            : t
        ),
      };

    case "REMOVE_TOAST":
      if (!action.toastId) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
};

// Separate effect handlers
const scheduleToastRemoval = (
  toastId: string,
  dispatch: React.Dispatch<Action>
) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const cancelToastRemoval = (toastId: string) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
    toastTimeouts.delete(toastId);
  }
};

type Toast = Omit<ToasterToast, "id">;

// Custom hook for managing toasts
function useToast() {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  // Handler functions
  const toast = React.useCallback(
    (props: Toast) => {
      const id = generateId();
      const newToast = { ...props, id, open: true };

      dispatch({ type: "ADD_TOAST", toast: newToast });

      // Schedule removal
      scheduleToastRemoval(id, dispatch);
    },
    [dispatch]
  );

  const dismiss = React.useCallback(
    (toastId?: string) => {
      dispatch({ type: "DISMISS_TOAST", toastId });

      if (toastId) {
        scheduleToastRemoval(toastId, dispatch);
      } else {
        state.toasts.forEach((toast) => {
          scheduleToastRemoval(toast.id, dispatch);
        });
      }
    },
    [state.toasts, dispatch]
  );

  const update = React.useCallback(
    (toastId: string, props: Partial<ToasterToast>) => {
      // Cancel any pending removals
      cancelToastRemoval(toastId);

      dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id: toastId },
      });

      // Reschedule removal if toast is still open
      if (props.open !== false) {
        scheduleToastRemoval(toastId, dispatch);
      }
    },
    [dispatch]
  );

  return {
    toasts: state.toasts,
    toast,
    dismiss,
    update,
  };
}

// Context setup
type ToastContext = ReturnType<typeof useToast>;

const ToastContext = React.createContext<ToastContext | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const value = useToast();

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

// Hook for consuming toast context
export function useToasts() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToasts must be used within a ToastProvider");
  }

  return context;
}

// Utility function for one-off toast usage
export const toast = (props: Toast) => {
  const toastContext = React.useContext(ToastContext);

  if (!toastContext) {
    console.warn("Toast was triggered outside of ToastProvider");
    return;
  }

  toastContext.toast(props);
};