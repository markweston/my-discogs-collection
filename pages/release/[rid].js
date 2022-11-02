import Link from "next/link";

const Release = (release) => {
  const releaseInfo = release.release.releases[0].basic_information;

  return (
    <div>
      <div className="flex">
        <div className="flex order-2 flex-col">
          <p>{releaseInfo.title}</p>
          <p>{releaseInfo.artists[0].name}</p>
          <p>{releaseInfo.labels[0].name} | {releaseInfo.labels[0].catno}</p>
          <p>{releaseInfo.year}</p>
          <p>{releaseInfo.genres[0]}</p>
          <p>{releaseInfo.formats[0].name}, {releaseInfo.formats[0].descriptions[0]}</p>
        </div>
        <div className="order-1">
          <img src={release.release.releases[0].basic_information.cover_image} className="aspect-square" alt="Album artwork" />
        </div>
      </div>
      <Link href={'/'} className="order-3">Back to the collection</Link>
    </div>
  )
}

export async function getServerSideProps(context) {
    // Call an Discogs API endpoint to get specific release
    const token = process.env.DISCOGS_API_TOKEN
    const releaseId = context.params.rid
    const resUrl = `https://api.discogs.com/users/mweston/collection/releases/${releaseId}?&token=${token}`;
    const res = await fetch(resUrl);
    /**
     * @todo Reduce the data returned to the individual release to reduce size and simplify outputting in component
     */
    const release = await res.json();
  
    // Return release to Release component
    return {
      props: {
        release,
      },
    }
}

export default Release