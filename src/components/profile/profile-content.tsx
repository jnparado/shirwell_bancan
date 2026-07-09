"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Mail, MapPin, Phone, X } from "lucide-react";
import {
  AuthFieldShell,
  authCardClass,
  authInputClass,
  authPrimaryButtonClass,
} from "@/components/auth/auth-ui";
import {
  profileInitials,
  type ProfileRecord,
  updateProfile,
  uploadProfileAvatar,
} from "@/lib/auth/profile";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type Props = {
  profile: ProfileRecord;
};

function displayName(profile: ProfileRecord): string {
  return profile.full_name?.trim() || profile.username?.trim() || profile.email || "Your profile";
}

export function ProfileContent({ profile: initialProfile }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState(initialProfile.full_name ?? "");
  const [phone, setPhone] = useState(initialProfile.phone ?? "");
  const [location, setLocation] = useState(initialProfile.location ?? "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialProfile.avatar_url);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const initials = useMemo(
    () => profileInitials(profile.full_name, profile.email),
    [profile.full_name, profile.email],
  );

  function openEditor() {
    setFullName(profile.full_name ?? "");
    setPhone(profile.phone ?? "");
    setLocation(profile.location ?? "");
    setAvatarPreview(profile.avatar_url);
    setAvatarFile(null);
    setError(null);
    setEditing(true);
  }

  function closeEditor() {
    setEditing(false);
    setAvatarFile(null);
    setAvatarPreview(profile.avatar_url);
    setError(null);
  }

  function onAvatarPick(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, or WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or smaller.");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError(null);
  }

  async function saveProfile() {
    setBusy(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();
      let avatarUrl = profile.avatar_url;

      if (avatarFile) {
        const { url, error: uploadError } = await uploadProfileAvatar(
          supabase,
          profile.id,
          avatarFile,
        );
        if (uploadError) {
          setError(uploadError);
          return;
        }
        avatarUrl = url;
      }

      const { error: saveError } = await updateProfile(supabase, {
        userId: profile.id,
        email: profile.email,
        fullName,
        phone,
        location,
        avatarUrl: avatarUrl ?? null,
      });

      if (saveError) {
        setError(saveError);
        return;
      }

      setProfile({
        ...profile,
        full_name: fullName.trim() || null,
        phone: phone.trim() || null,
        location: location.trim() || null,
        avatar_url: avatarUrl,
      });
      setEditing(false);
      setAvatarFile(null);
      router.refresh();
    } catch {
      setError("Could not save your profile. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        className={`${authCardClass} group w-full p-5 text-left transition hover:shadow-[0_2px_8px_rgba(60,64,67,0.2)]`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 flex-1 text-xl font-semibold text-[#202124] sm:text-2xl">
            {displayName(profile)}
          </h2>
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5f6368] text-lg font-semibold text-white">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              initials
            )}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="flex items-center gap-3 text-sm text-[#3c4043]">
              <Mail className="h-4 w-4 shrink-0 text-[#5f6368]" strokeWidth={1.75} />
              <span className="truncate">{profile.email ?? "Add your email"}</span>
            </p>
            <p className="flex items-center gap-3 text-sm text-[#3c4043]">
              <Phone className="h-4 w-4 shrink-0 text-[#5f6368]" strokeWidth={1.75} />
              <span className="truncate">{profile.phone?.trim() || "Add your phone"}</span>
            </p>
            <p className="flex items-center gap-3 text-sm text-[#3c4043]">
              <MapPin className="h-4 w-4 shrink-0 text-[#5f6368]" strokeWidth={1.75} />
              <span className="truncate">{profile.location?.trim() || "Add your location"}</span>
            </p>
          </div>
          <ChevronRight
            className="h-5 w-5 shrink-0 text-[#5f6368] transition group-hover:translate-x-0.5 group-hover:text-[#202124]"
            strokeWidth={2}
          />
        </div>
      </button>

      {editing ? (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Edit profile"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeEditor();
          }}
        >
          <div className={`${authCardClass} max-h-[90dvh] w-full max-w-lg overflow-y-auto p-6`}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-[#202124]">Edit profile</h3>
              <button
                type="button"
                onClick={closeEditor}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5f6368] hover:bg-[#f1f3f4]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5f6368] text-xl font-semibold text-white">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt=""
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  profileInitials(fullName, profile.email)
                )}
              </span>
              <div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="rounded-full border border-[#dadce0] px-4 py-2 text-sm font-medium text-[#1a73e8] transition hover:bg-[#f8f9fa]"
                >
                  Change photo
                </button>
                <p className="mt-1 text-xs text-[#5f6368]">JPG, PNG, or WebP up to 5 MB</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => onAvatarPick(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            {error ? (
              <p
                className="mb-4 rounded-lg border border-[#f28b82] bg-[#fce8e6] px-4 py-3 text-sm text-[#c5221f]"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                void saveProfile();
              }}
            >
              <AuthFieldShell icon={<Mail className="h-5 w-5" />}>
                <input
                  value={profile.email ?? ""}
                  readOnly
                  className={`${authInputClass} cursor-not-allowed text-[#5f6368]`}
                  aria-label="Email"
                />
              </AuthFieldShell>

              <AuthFieldShell icon={<UserIcon />}>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className={authInputClass}
                  autoComplete="name"
                />
              </AuthFieldShell>

              <AuthFieldShell icon={<Phone className="h-5 w-5" />}>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className={authInputClass}
                  autoComplete="tel"
                />
              </AuthFieldShell>

              <AuthFieldShell icon={<MapPin className="h-5 w-5" />}>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, country"
                  className={authInputClass}
                  autoComplete="address-level2"
                />
              </AuthFieldShell>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={busy} className={authPrimaryButtonClass}>
                  {busy ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={closeEditor}
                  disabled={busy}
                  className="rounded-full border border-[#dadce0] px-5 py-2.5 text-sm font-medium text-[#3c4043] transition hover:bg-[#f8f9fa] disabled:opacity-70"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function UserIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}
