import { useRouter } from 'next/router'

const Release = (release) => {
  const router = useRouter()
  const { rid } = router.query

  console.log(release)

  return (
    <div>
      <p>Release: {rid}</p>
      <p>Title {release.release.releases[0].basic_information.title}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
    // Call an Discogs API endpoint to get specific release
    const token = process.env.DISCOGS_API_TOKEN
    const release_id = context.params.rid
    const resUrl = `https://api.discogs.com/users/mweston/collection/releases/${release_id}?&token=${token}`;
    const res = await fetch(resUrl);
    const release = await res.json();

    console.log(resUrl);
  
    // Return release to Release component
    return {
      props: {
        release,
      },
    }
}

export default Release