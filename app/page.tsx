import Search from '@/components/Search'
import SearchResults from '@components/SearchResults'

export default function Home() {
  return (
    <section className="w-full flex-center flex-col mt-4  ">
      <h1 className="head_text text-center">
        <span className="blue_gradient">Git Statistics</span>
      </h1>
      <Search />
      <SearchResults />
    </section>
  )
}
