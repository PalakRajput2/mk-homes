'use client';

import React from 'react';
import toast from 'react-hot-toast';

interface ConfirmDeleteToastProps {
  name: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

// Keep track if the toast is currently active (outside the function)
let toastActive = false;

// This function triggers the confirmation toast and manages toast lifecycle.
export function showConfirmDeleteToast({ name, onConfirm, onCancel }: ConfirmDeleteToastProps) {
  // Return early if a toast with this id already exists
  if (toastActive) return;

  toastActive = true;

  const existingToastId = 'confirm-delete-toast';

  toast(
    (t) => (
      <div
        className="p-2 h-[150px] w-[300px] flex justify-center items-center flex-col gap-5"
        role="alertdialog"
        aria-modal="true"
      >
        <p className="text-2xl mb-2">Delete {name}?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(t.id);
              toastActive = false;
            }}
            className="px-2 py-1 text-lg bg-red-500 text-white rounded cursor-pointer"
            autoFocus
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              toastActive = false;
              if (onCancel) onCancel();
            }}
            className="px-2 py-1 text-lg border rounded cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    ),
    { id: existingToastId, duration: 5000 }
  );
}
