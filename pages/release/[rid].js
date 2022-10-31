import { useRouter } from 'next/router'

const Release = (data) => {
  const router = useRouter()
  const { rid } = router.query

  console.log(data.releases)

  return (
    <div>
      <p>Release: {rid}</p>
      <p>Title {data.release.releases[0].basic_information.title}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
    // Call an Discogs API endpoint to get specific release
    const token = process.env.DISCOGS_API_TOKEN
    const release_id = context.params.rid
    const resUrl = `https://api.discogs.com/users/mweston/collection/releases/${release_id}?&token=${token}`;
    const res = await fetch(resUrl);
    const data = await res.json();
  
    // Return release to Release component
    return {
      props: {
        data,
      },
    }
}

export default Release