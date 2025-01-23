import { redirect } from 'next/navigation'

import { serverClient } from '@/db/client'

const ProtectedPage = async () => {
  const db = await serverClient()

  const {
    data: { user },
  } = await db.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          {'This is a protected page that you can only see as an authenticated'}
          {'user'}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">{'Your user details'}</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">{'Next steps'}</h2>
      </div>
    </div>
  )
}

export default ProtectedPage
