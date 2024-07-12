import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

type Props = {};

// signout fn:
function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}>
      <button type='submit'>Sign Out</button>
    </form>
  );
}

// signin header:
export async function SignIn(props: Props) {
  const session = await auth();
  // console.log(session);

  return (
    <header>
      <nav>
        <div>
          <h1>logo</h1>
          <div>
            {session?.user ? (
              <>
                {session.user.name && session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={38}
                    height={38}
                    className='rounded-full'
                  />
                )}
                <SignOut />
              </>
            ) : (
              <Link href='/api/auth/signin'>
                <button className='flex items-center text-white bg-violet-700 hover:bg-violet-900 hover:text-white rounded-md px-3 py-2 my-4'>
                  <span>Login or Register</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

// return (
//   <>
//     <form
//       action={async () => {
//         "use server";
//         await signIn("google");
//       }}>
//       <button type='submit'>Signin with Google</button>
//     </form>

//     <form
//       action={async () => {
//         "use server";
//         await signIn("github");
//       }}>
//       <button type='submit'>Signin with GitHub</button>
//     </form>
//   </>
// );
