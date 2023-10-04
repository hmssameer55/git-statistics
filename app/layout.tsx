import "@/styles/globals.css"
import type { Metadata } from 'next'
import { GithubProvider } from '@/store/githubContext'

export const metadata: Metadata = {
  title: 'Github search',
  description: 'Github search',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GithubProvider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            {children}
          </main>
        </GithubProvider>
      </body>
    </html>
  )
}
