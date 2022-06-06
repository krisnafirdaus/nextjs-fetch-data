import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Contoh.module.css";

export default function Contoh({ id, flavors }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{id}</title>
        {/* <meta name="description" content={body} /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{id}</h1>
        {flavors.map((x, y) => {
          console.log(x);
          <div key={y}>
            <h1 className={styles.title}>{x.potency}</h1>
            <h1 className={styles.title}>{x.flavor?.name}</h1>
          </div>;
        })}

        <p className={styles.description}></p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://pokeapi.co/api/v2/berry");
  const posts = await response.json();

  const paths = posts.results.map((x, y) => ({
    params: {
      id: y.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch("https://pokeapi.co/api/v2/berry/" + params.id);
  const post = await response.json();

  return {
    props: {
      ...post,
    },
  };
}
