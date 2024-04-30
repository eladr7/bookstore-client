import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h2>Dashboard</h2>
      <div className="flex justify-center my-8">
        <Link href="/books">
          <button className="btn-primary">Enter the catalog</button>
        </Link>
      </div>

      <div className="card">
        <h3>Our moto</h3>

        <div>
          <p>
            We want to give you the best experice, <br />
            so join and see our great books.
            <br />
            <br />
            <small>stay tuned for new amazing books that will arrive</small>
          </p>
        </div>
      </div>
    </main>
  );
}
