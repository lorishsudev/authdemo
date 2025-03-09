import { auth, signIn, signOut } from "@/auth"

export default async function SignIn() {

  const session = await auth()
  console.log(session)

  const user = session?.user
  if (user) {
    return (
      <>
      <p>{user.name}</p>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Signout</button>
      </form>
      </>
    )
  }
  else
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    )
} 