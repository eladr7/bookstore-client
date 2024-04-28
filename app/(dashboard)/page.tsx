import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>Dashboard</h2>
      <div className="flex justify-center my-8">
        <Link href="genres">
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
            <i>stay tuned for new amazing books that will arrive</i>
          </p>
        </div>
      </div>
    </main>
  );
}
