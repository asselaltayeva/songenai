"use client"

import { AuthCard } from "@daveyplate/better-auth-ui"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { authClient } from "~/lib/auth-client"

export function AuthView({ pathname }: { pathname: string }) {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      })
    } catch (error) {
      toast.error("Google sign-in failed:")
    }
  }

  const showFallbackButton = true 

  return (
    <main className="container flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      {["settings", "security"].includes(pathname) && (
        <Button className="self-start" variant="outline" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>
      )}

      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <AuthCard pathname={pathname}/>

        {showFallbackButton && (
          <>
            <div className="relative w-[85%] py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-[85%] gap-2"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon />
              Google
            </Button>
          </>
        )}
      </div>
    </main>
  )
}

// Google icon component
function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.8 10H12v4h5.7c-.8 2.3-3 4-5.7 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.7 0 3.2.7 4.2 1.8L19 4.2C17.3 2.6 14.8 1.6 12 1.6 6.5 1.6 2 6.1 2 11.6s4.5 10 10 10c5.5 0 10-4.5 10-10 0-.7-.1-1.4-.2-2z" />
    </svg>
  )
}