import '@styles/globals.css';

export const metadata = {
  title : "PromptShare",
  description : "A web app to share AI prompts"
}

const Layout = ({children}) => {
  return (
    <html lang='en'>
      <div className='main'>
        <div className='gradient' />
      </div>
      <main className='app'>
        {children}
      </main>
    </html>
  )
}

export default Layout