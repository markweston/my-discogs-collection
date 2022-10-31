import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = ({collection}) => {
  return (
    <div>
      <Head>
        <title>Mark's Discogs Collection</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header>
          <h1>My Discogs Collection</h1>
        </header>
        <style jsx>{`
          .collection-item {
            perspective: 1000px;
          }

          .collection-item__inner {
            transform-style: preserve-3d;
          }

          .collection-item:hover .collection-item__inner {
            transform: rotateY(180deg);
          }

          .collection-item__front,
          .collection-item__back {
            backface-visibility: hidden;
          }

          .collection-item__back {
            transform: rotateY(180deg);
          }
        `}</style>
        <div className='collection flex flex-wrap'>
          {collection.releases.map(function(release, i){
            return (
              <div className='collection-item w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 aspect-square' key={i}>
                <div className='collection-item__inner relative w-full h-full text-center transition-transform ease-linear duration-500'>
                  <div className='collection-item__front absolute w-full h-full'>
                    <img src={release.basic_information.cover_image} className="aspect-square" alt="Album artwork" />
                  </div>
                  <div className='collection-item__back absolute w-full h-full bg-black text-white'>
                    <h2>{release.basic_information.title} by {release.basic_information.artists[0].name}</h2>
                    <a href="">Link to the Dicogs page</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {collection.pagination.items}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  // Call an Discogs API endpoint to get my collection.
  const token = process.env.DISCOGS_API_TOKEN
  const resUrl = `https://api.discogs.com/users/mweston/collection/folders/0/releases?&token=${token}`;
  const res = await fetch(resUrl);
  const collection = await res.json();

  // Return collection to Home component
  return {
    props: {
      collection,
    },
  }
}

export default Home
